use crate::api::{get_request};
use crate::models::{Org, Repo, RepoReadme, Url, User};
use reqwest::Client;
use rspc::ErrorCode;
use serde_json::Value;
use crate::main::Context;

#[tauri::command]
pub async fn get_user_orgs(token: String) -> Result<Value, rspc::Error> {
    let response = get_request(Url::WithBaseUrl("/user/orgs"), &token).await;
    match response {
        Ok(response) => {
            let json = response.json().await;

            match json {
                Ok(json) => Ok(json),
                Err(err) => Err(rspc::Error::new(
                    ErrorCode::InternalServerError,
                    err.to_string(),
                )),
            }
        }
        Err(err) => Err(rspc::Error::new(
            ErrorCode::InternalServerError,
            err.to_string(),
        )),
    }
}

#[tauri::command]
pub async fn validate_token(token: String) -> Result<Value, rspc::Error> {
    let response = get_request(Url::WithBaseUrl("/user"), &token).await;
    match response {
        Ok(response) => {
            let json = response.json().await;

            match json {
                Ok(json) => Ok(json),
                Err(err) => Err(rspc::Error::new(
                    ErrorCode::InternalServerError,
                    err.to_string(),
                )),
            }
        }
        Err(err) => Err(rspc::Error::new(
            ErrorCode::InternalServerError,
            err.to_string(),
        )),
    }
}

#[tauri::command]
pub async fn get_org_repos(_: Context, token: String, org_name: String) -> Result<Value, rspc::Error> {
    let response = get_request(Url::WithParams(format!("/orgs/{org_name}/repos")), &token).await;
    match response {
        Ok(response) => {
            let json = response.json().await;

            match json {
                Ok(data) => Ok(data),   
                Err(err) => Err(rspc::Error::new(
                    ErrorCode::InternalServerError,
                    err.to_string(),
                )),
            }
        }
        Err(err) => Err(rspc::Error::new(
            ErrorCode::InternalServerError,
            err.to_string(),
        )),
    }


}

// #[tauri::command]
// pub fn get_readme(token: &str, org_name: &str, repo_name: &str) -> ApiResult<RepoReadme> {
//     let response = get_request(Url::WithParams(format!("/repos/{org_name}/{repo_name}/readme")), token)?;
//     let data: RepoReadme = serde_json::from_str(&response).unwrap();
//
//     Ok(data)
// }
//
