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
    name: String,
    pub updated_at: String,
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
