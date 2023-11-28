import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables, JiraSearchResponse } from './jira.interface';

@Injectable()
export class JiraService {
  private url: EnvironmentVariables['url'];
  private defaultOptions: RequestInit;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    const authentication = this.configService.get('authentication', {
      infer: true,
    });
    this.url = this.configService.get('url');
    this.defaultOptions = {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${authentication.username}:${authentication.token}`,
        ).toString('base64')}`,
      },
    };
  }

  private async getIssues(jql: string): Promise<JiraSearchResponse> {
    const url = `${this.url}/rest/api/3/search?jql=${jql}`;
    const response = await fetch(url, this.defaultOptions);
    return await response.json();
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
}
