
use crate::api::get_request;
use crate::models::{ApiResult, Org, Repo, Url, User};

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


#[tauri::command]
pub fn get_user_orgs(token: &str) -> ApiResult<Vec<Org>> {
    let response = get_request(Url::WithBaseUrl("/user/orgs"), token)?;
    let data: Vec<_> = serde_json::from_str(&response).unwrap();

    Ok(data)
}

#[tauri::command]
pub fn validate_token(token: &str) -> ApiResult<Option<User>> {
    let response = get_request(Url::WithBaseUrl("/user"), token)?;
    let data: serde_json::Value = serde_json::from_str(&response).unwrap();

    if data["login"].is_string() {
        let user = User {
            avatar_url: data["avatar_url"].to_string(),
            name: data["login"].to_string(),
        };

        Ok(Some(user))
    } else {
        Ok(None)
    }
}

#[tauri::command]
pub fn get_org_repos(token: &str, org_name: &str) -> ApiResult<Vec<Repo>> {
    let response = get_request(Url::WithParams(format!("/orgs/{org_name}/repos")), token)?;
    let data: Vec<_> = serde_json::from_str(&response).unwrap();

    Ok(data)
}
