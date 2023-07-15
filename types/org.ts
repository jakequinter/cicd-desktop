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

type Actor = {
  login: string;
};

export type WorkflowRun = {
  actor: Actor;
  conclusion?: string;
  created_at: string;
  html_url: string;
  id: number;
  login: string;
  name: string;
  status: string;
  updated_at: string;
};

export type Action = {
  totalCount: number;
  workflow_runs: WorkflowRun[];
};
