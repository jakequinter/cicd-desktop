// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use command::{get_org_repos, get_readme, get_user_orgs, validate_token};

mod api;
mod command;
mod error;
mod models;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_org_repos,
            get_readme,
            get_user_orgs,
            validate_token,

        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

