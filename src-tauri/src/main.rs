// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri_template::FrameworkSate;
use tauri_template::ipc::{ipc_handlers, splashscreen};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .manage(FrameworkSate::new())
        .menu(tauri::menu::Menu::default)
        .setup(|app| {
            #[cfg(debug_assertions)]
            let window = app.get_webview_window("main").unwrap();
            let handle = app.handle();

            splashscreen(handle.clone()).unwrap();

            #[cfg(debug_assertions)]
            window.open_devtools();

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(ipc_handlers())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
