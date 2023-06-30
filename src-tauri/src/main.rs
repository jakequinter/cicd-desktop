// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;
use rspc::Router;
use command::{get_org_repos, get_user_orgs, validate_token};

mod api;
mod command;
mod error;
mod models;

pub struct Context; 

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
        // change the bindings filename to your liking
        .config(rspc::Config::new().export_ts_bindings("../src/bindings.d.ts"))
        .query("get_user_orgs", |t| t(|_, token: String| get_user_orgs(token)))
        .query("validate_token", |t| t(|_, token: String| validate_token(token)))
        // .query("get_org_repos", |t| t(|_, token: String, org_name: String| get_org_repos(token, org_name)))
        .build();
    Arc::new(router)
}

