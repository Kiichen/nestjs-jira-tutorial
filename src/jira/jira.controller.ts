import { Controller, Get } from '@nestjs/common';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private jiraService: JiraService) {}

  @Get()
  async fetchJiraIssues() {
    return this.jiraService.getFutureIssues();
  }
  @Get('dashboard')
  async fetchJiraIssuesForDashboard() {
    return this.jiraService.getDashboardIssues();
  }
}
