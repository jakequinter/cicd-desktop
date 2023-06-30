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

export type RepoReadMe = {
  content: string;
};
