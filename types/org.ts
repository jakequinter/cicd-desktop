export type Org = {
  avatar_url: string;
  id: number;
  login: string;
  url: string;
};

export type Repo = {
  id: number;
  name: string;
  updated_at: string;
};

export type WorkflowRun = {
  conclusion: string;
  created_at: string;
  id: number;
  name: string;
  html_url: string;
};

export type Action = {
  totalCount: number;
  workflow_runs: WorkflowRun[];
};
