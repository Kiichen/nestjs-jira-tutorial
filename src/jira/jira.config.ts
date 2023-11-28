import { EnvironmentVariables } from './jira.interface';

export default (): EnvironmentVariables => ({
  url: process.env.JIRA_URL,
  authentication: {
    username: process.env.JIRA_USERNAME,
    token: process.env.JIRA_TOKEN,
  },
});
