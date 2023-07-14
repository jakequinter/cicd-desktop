use crate::error::TauriError;
use serde::{Deserialize, Serialize};

pub type ApiResult<T, E = TauriError> = Result<T, E>;

#[derive(Deserialize, Serialize)]
pub struct User {
    pub avatar_url: String,
    pub name: String,
}

#[derive(Deserialize, Serialize)]
pub struct Org {
    avatar_url: String,
    id: u32,
    login: String,
    url: String,
}

#[derive(Deserialize, Serialize)]
pub struct Repo {
    id: u32,
    language: Option<String>,
    name: String,
    open_issues_count: u32,
    pushed_at: String,
    stargazers_count: u32,
    visibility: String,
    watchers_count: u32,
}

#[derive(Deserialize, Serialize)]
pub struct RepoReadme {
    pub content: String,
}

#[derive(Deserialize, Serialize)]
struct WorkflowRun {
    conclusion: Option<String>,
    created_at: String,
    id: u64,
    name: String,
    html_url: String,
    status: String
}

#[derive(Deserialize, Serialize)]
pub struct Action {
    total_count: u32,
    workflow_runs: Vec<WorkflowRun>,
}

pub enum Url {
    WithBaseUrl(&'static str),
    WithParams(String),
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::WithBaseUrl(url) => format!("https://api.github.com{url}"),
            Url::WithParams(url) => format!("https://api.github.com{}", url),
        }
    }
}
