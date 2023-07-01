use crate::api::get_request;
use crate::models::{ApiResult, Org, Repo, Url, User, RepoReadme};

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
    let mut data: Vec<Repo> = serde_json::from_str(&response).unwrap();
    data.sort_by(|a, b| b.updated_at.cmp(&a.updated_at));


    Ok(data)
}

#[tauri::command]
pub fn get_readme(token: &str, org_name: &str, repo_name: &str) -> ApiResult<Option<String>> {
    let response = get_request(Url::WithParams(format!("/repos/{org_name}/{repo_name}/readme")), token)?;
    let encoded: RepoReadme = serde_json::from_str(&response).unwrap();
    let encoded = encoded.content.replace("\n", "");  

    let decoded = match base64::decode(&encoded) {
        Ok(bytes) => {
            let readme = String::from_utf8_lossy(&bytes).to_string();
            Some(readme)
        }
        Err(err) => {
            println!("Error decoding readme: {}", err);
            None
        }
    };

    Ok(decoded)
}
