use serde::{Deserialize, Serialize};
use crate::error::TauriError;

pub type ApiResult<T, E = TauriError> = Result<T, E>;

#[derive(Deserialize, Serialize)]
pub struct Org {
    id: u32,
    url: String,
    avatar_url: String,
}

#[derive(Deserialize, Serialize)]
pub struct User {
    pub avatar_url: String,
    pub name: String,
}

pub enum Url {
    WithBaseUrl(&'static str),
}

impl Url {
    pub fn value(self) -> String {
        match self {
            Url::WithBaseUrl(url) => format!("https://api.github.com/{}", url),
        }
    }
}
