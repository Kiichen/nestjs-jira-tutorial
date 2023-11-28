import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables, JiraSearchResponse } from './jira.interface';

@Injectable()
export class JiraService {
  private authentication: EnvironmentVariables['authentication'];
  private url: EnvironmentVariables['url'];

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    this.authentication = this.configService.get('authentication', {
      infer: true,
    });
    this.url = this.configService.get('url');
  }

  async getIssues(): Promise<JiraSearchResponse> {
    const url = `${this.url}/rest/api/3/search`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${this.authentication.username}:${this.authentication.token}`,
        ).toString('base64')}`,
      },
    });
    const data: JiraSearchResponse = await response.json();
    return data;
  }
}
