// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest::Client;
use rspc::Router;
use std::sync::Arc;
use serde_json::Value;

use command::{get_org_repos, get_user_orgs, validate_token};

mod api;
mod command;
mod error;
mod models;
pub enum MyCustomError {
    ServerDidABad,
}
 
impl From<MyCustomError> for rspc::Error {
    fn from(_: MyCustomError) -> Self {
        rspc::Error::new(rspc::ErrorCode::InternalServerError, "Server did an oopsie".into())
    }
}
 
struct Context;

fn main() {
    let rt = tokio::runtime::Runtime::new().unwrap();
    let _guard = rt.enter();
    tauri::Builder::default()
        .plugin(rspc::integrations::tauri::plugin(router(), || Context))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn router() -> Arc<Router<Context>> {
    let router = Router::new()
        .config(rspc::Config::new().export_ts_bindings("../src/bindings.d.ts"))
        .query("greet", |t| t(|_, name: String| greet(&name)))
        // .query("my_custom_command", |t| t(|_, value: String| my_custom_command(value)))
         .query("get_posts", |t| t(|_, token: String| get_posts(token)))
         .query("get_repos", |t| t(|_, token: String| get_repos(token)))
        .build();
    Arc::new(router)
}

// async fn get_posts() -> Result<Value, reqwest::Error> {
//     let client = Client::new();
//     let response = client.get("https://jsonplaceholder.typicode.com/posts")
//         .send()
//         .await?;
//     
//     let json: Value = response.json().await?;
//
//     Ok(json)
// }

#[tauri::command]
async fn get_posts(token: String) -> Result<Value, rspc::Error> {
    let client = Client::new();
    let response = client.get("https://jsonplaceholder.typicode.com/posts")
        .send()
        .await
        .map_err(|_| MyCustomError::ServerDidABad)?;
    
    let json: Value = response.json().await.map_err(|_| MyCustomError::ServerDidABad)?;

    Ok(json)
}

// Declare the async function using String instead of &str, as &str is borrowed and thus unsupported
// #[tauri::command]
// async fn my_custom_command(value: String) -> String {
//   // Call another async function and wait for it to finish
//   let test = get_posts().await;
//   println!("{:?}", test);
//
//     // Return the result of the async function as a json String
//     test.unwrap().to_string()
// }

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

async fn get_repos(token: String) -> Result<Value, rspc::Error> {
    let client = Client::new();
    let response = client.get("https://api.github.com/orgs/merryfield/repos")
        .header("User-Agent", "flowlog")
        .send()
        .await
        .map_err(|_| MyCustomError::ServerDidABad)?;
    
    let json: Value = response.json().await.map_err(|_| MyCustomError::ServerDidABad)?;

    Ok(json)
}
