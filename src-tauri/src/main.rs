// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rspc::Router;
use std::sync::Arc;

use command::{get_org_repos, get_user_orgs, greet, validate_token};

mod api;
mod command;
mod error;
mod models;

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
        .config(rspc::Config::new().export_ts_bindings("../../src/bindings.d.ts"))
        .query("greet", |t| t(|_, name: String| greet(&name)))
        .build();
    Arc::new(router)
}
