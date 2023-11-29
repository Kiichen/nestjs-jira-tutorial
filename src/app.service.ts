import { Inject, Injectable } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from './drizzle/schema';
import { DB_CONNECTION } from './drizzle/drizzle.module';
import { JiraService } from './jira/jira.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB_CONNECTION) private drizzleDev: MySql2Database<typeof schema>,
    private readonly jiraService: JiraService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    const issues = (await this.jiraService.getFutureIssues()).issues;

    const employees = await this.drizzleDev
      .select()
      .from(schema.employees)
      .execute();

    const jiraIds = new Set(employees.map((employee) => employee.jira_id));

    for (const issue of issues) {
      const accountId = issue.fields.assignee?.accountId;

      if (!accountId || jiraIds.has(accountId)) {
        continue;
      }

      const employee: (typeof schema.employees)['$inferInsert'] = {
        display_name: issue.fields.assignee.displayName,
        email: issue.fields.assignee.emailAddress,
        employee_workload: 80,
        jira_id: accountId,
      };
      await this.drizzleDev.insert(schema.employees).values(employee).execute();
      jiraIds.add(accountId);
    }
  }
}
