use serde::{Deserialize, Serialize};
use crate::error::TauriError;

pub type APIResult<T, E = TauriError> = Result<T, E>;

#[derive(Deserialize, Serialize)]
pub struct Org {
    id: u32,
    url: String,
    avatar_url: String,
}

pub enum URL {
    WithBaseUrl(&'static str),
}

impl URL {
    pub fn value(self) -> String {
        match self {
            URL::WithBaseUrl(url) => format!("https://api.github.com/{}", url),
        }
    }
}
