export type Org = {
  avatar_url: string;
  id: number;
  login: string;
  url: string;
};

export type Repo = {
  id: number;
  language?: string;
  name: string;
  open_issues_count: number;
  pushed_at: string;
  stargazers_count: number;
  visibility: string;
  watchers_count: number;
};

export type WorkflowRun = {
  conclusion?: string;
  created_at: string;
  id: number;
  name: string;
  html_url: string;
  status: string;
};

export type Action = {
  totalCount: number;
  workflow_runs: WorkflowRun[];
};
