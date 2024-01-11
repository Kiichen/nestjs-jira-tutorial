import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from './drizzle/schema';
import { DB_CONNECTION } from './drizzle/drizzle.module';
import { JiraService } from './jira/jira.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB_CONNECTION) private db: MySql2Database<typeof schema>,
    private readonly jiraService: JiraService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUniqueJiraIds() {
    const employees = await this.db.select().from(schema.employees).execute();

    return new Set(employees.map((employee) => employee.jira_id));
  }

  async getUniqueProjectIds() {
    const projects = await this.db.select().from(schema.projects).execute();

    return new Set(projects.map((project) => project.jira_id));
  }

  @Cron(CronExpression.EVERY_HOUR)
  async processIssues() {
    const issues = (await this.jiraService.getFutureIssues()).issues;

    const jiraIds = await this.getUniqueJiraIds();
    const projectIds = await this.getUniqueProjectIds();
    const employeeOnProjectsMap = await this.db
      .select()
      .from(schema.employeesOnProjects)
      .execute()
      .then((rows) => {
        const map = new Map<string, Set<number>>();
        for (const row of rows) {
          const employeeId = row.employee_id?.toString();
          if (!map.has(employeeId)) {
            map.set(employeeId, new Set());
          }
          map.get(employeeId)!.add(row.project_id);
        }
        return map;
      });

    const employees: (typeof schema.employees)['$inferInsert'][] = [];
    const projects: (typeof schema.projects)['$inferInsert'][] = [];

    for (const issue of issues) {
      const assignee = issue.fields.assignee;

      if (!assignee) {
        continue;
      }

      if (!jiraIds.has(assignee.accountId)) {
        employees.push({
          display_name: assignee.displayName,
          email: assignee.emailAddress,
          employee_workload: 80,
          jira_id: assignee.accountId,
        });
        jiraIds.add(assignee.accountId);
      }

      const jiraProject = issue.fields.project;
      if (!projectIds.has(jiraProject.id)) {
        projects.push({
          name: jiraProject.name,
          jira_id: jiraProject.id,
        });
        projectIds.add(jiraProject.id);
      }

      employeeOnProjectsMap.set(
        assignee.accountId,
        (employeeOnProjectsMap.get(assignee.accountId) ?? new Set()).add(1),
      );
    }

    if (employees.length > 0) {
      await this.db.insert(schema.employees).values(employees).execute();
    }
    if (projects.length > 0) {
      await this.db.insert(schema.projects).values(projects).execute();
    }
  }
}
