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
  async getUsers() {
    const issues = (await this.jiraService.getFutureIssues()).issues;

    const jiraIds = await this.getUniqueJiraIds();
    const projectIds = await this.getUniqueProjectIds();

    for (const issue of issues) {
      const assignee = issue.fields.assignee;

      if (!assignee) {
        continue;
      }

      if (!jiraIds.has(assignee.accountId)) {
        const employee: (typeof schema.employees)['$inferInsert'] = {
          display_name: assignee.displayName,
          email: assignee.emailAddress,
          employee_workload: 80,
          jira_id: assignee.accountId,
        };
        await this.db.insert(schema.employees).values(employee).execute();
        jiraIds.add(assignee.accountId);
      }

      const jiraProject = issue.fields.project;
      if (!projectIds.has(jiraProject.id)) {
        const project: (typeof schema.projects)['$inferInsert'] = {
          name: jiraProject.name,
          jira_id: jiraProject.id,
        };
        await this.db.insert(schema.projects).values(project).execute();
        projectIds.add(jiraProject.id);
      }
    }
  }
}
