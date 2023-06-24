
use crate::api::get_request;
use crate::models::{Org, APIResult, URL};

#[tauri::command]
pub fn get_user_orgs() -> APIResult<Vec<Org>> {
    let response = get_request(URL::WithBaseUrl("user/orgs"))?;
    let response: Vec<_> = serde_json::from_str(&response).unwrap();

    Ok(response)
}

