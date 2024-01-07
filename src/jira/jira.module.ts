import { Module } from '@nestjs/common';
import { JiraService } from './jira.service';
import { JiraController } from './jira.controller';
import { ConfigModule } from '@nestjs/config';
import jiraConfig from './jira.config';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [JiraService],
  controllers: [JiraController],
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [jiraConfig],
    }),
  ],
  exports: [JiraService],
})
export class JiraModule {}
