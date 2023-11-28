import { Module } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraController } from './jira.controller';
import { ConfigModule } from '@nestjs/config';
import jiraConfig from './jira.config';

@Module({
  providers: [JiraService],
  controllers: [JiraController],
  imports: [
    ConfigModule.forRoot({
      load: [jiraConfig],
    }),
  ],
})
export class JiraModule {}
