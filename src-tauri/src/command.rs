
use crate::api::get_request;
use crate::models::{Org, ApiResult, Url, User};

#[tauri::command]
pub fn get_user_orgs(token: &str) -> ApiResult<Vec<Org>> {
    let response = get_request(Url::WithBaseUrl("user/orgs"), token)?;
    let response: Vec<_> = serde_json::from_str(&response).unwrap();

    Ok(response)
}

#[tauri::command]
pub fn validate_token(token: &str) -> ApiResult<Option<User>> {
    let response = get_request(Url::WithBaseUrl("user"), token)?;
    let response: serde_json::Value = serde_json::from_str(&response).unwrap();

    if response["login"].is_string() {
        let user = User {
            avatar_url: response["avatar_url"].to_string(),
            name: response["login"].to_string(),
        };

        Ok(Some(user))
    } else {
        Ok(None)
    }
}

