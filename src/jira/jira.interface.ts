export interface EnvironmentVariables {
  url: string;
  authentication: {
    username: string;
    token: string;
  };
}

export interface DashboardIssue {
  summary: string;
  project: string;
  status: string;
  assignee: string;
  storypoints: number;
}

export interface JiraSearchResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

export interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}

export interface Fields {
  summary: string;
  status: Status;
  assignee: Assignee;
  creator: Assignee;
  reporter: Assignee;
  created: string;
  updated: string;
  description: string;
  issuetype: Issuetype;
  project: Project;
  subtasks: Issue[];
  customfield_10016: number | null;
}

export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
  projectCategory: ProjectCategory;
}

export interface ProjectCategory {
  self: string;
  id: string;
  name: string;
  description: string;
}

export interface Assignee {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface AvatarUrls {
  '48x48': string;
  '24x24': string;
  '16x16': string;
  '32x32': string;
}

export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId: number;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}
