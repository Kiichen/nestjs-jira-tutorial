import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DashboardIssue,
  EnvironmentVariables,
  JiraSearchResponse,
} from './jira.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JiraService {
  private url: EnvironmentVariables['url'];

  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private readonly httpService: HttpService,
  ) {
    const authentication = this.configService.get('authentication', {
      infer: true,
    })!;
    this.url = this.configService.get('url')!;
    this.httpService.axiosRef.interceptors.request.use(function (config) {
      config.headers.Authorization = `Basic ${Buffer.from(
        `${authentication.username}:${authentication.token}`,
      ).toString('base64')}`;
      return config;
    });
  }

  private async getIssues(jql: string): Promise<JiraSearchResponse> {
    const url = `${this.url}/rest/api/3/search?jql=${jql}`;
    const { data } = await firstValueFrom(
      this.httpService.get<JiraSearchResponse>(url),
    );
    return data;
  }

  async getFutureIssues(): Promise<JiraSearchResponse> {
    const query = `sprint in (openSprints(), futureSprints())`;
    return this.getIssues(query);
  }

  async getFutureIssuesByEmployee(
    employee: string,
  ): Promise<JiraSearchResponse> {
    const query = `assignee = ${employee} AND sprint in (openSprints(), futureSprints())`;
    return this.getIssues(query);
  }

  async getDashboardIssues(): Promise<DashboardIssue[]> {
    return (await this.getFutureIssues()).issues.map((issue) => ({
      summary: issue.fields.summary,
      project: issue.fields.project.name,
      status: issue.fields.status.name,
      assignee: issue.fields.assignee?.displayName,
      storypoints:
        issue.fields.customfield_10016 && !issue.fields.subtasks.length
          ? issue.fields.customfield_10016
          : 0,
    }));
  }
}
