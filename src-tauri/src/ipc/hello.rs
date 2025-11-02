use tauri::ipc::Response;
use tauri::{AppHandle, Emitter};

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn read_file() -> crate::Result<Response> {
    let data = std::fs::read("/path/to/file")?;
    Ok(tauri::ipc::Response::new(data))
}

#[tauri::command]
pub fn login(user: String, password: String) -> crate::Result<String> {
    if user == "tauri" && password == "tauri" {
        // resolve
        Ok("logged_in".to_string())
    } else {
        // reject
        Err("invalid credentials".into())
    }
}

/// 事件
#[tauri::command]
pub fn download(app: AppHandle, url: String) -> crate::Result<()> {
    app.emit("download-started", &url)?;
    for progress in [1, 15, 50, 80, 100] {
        app.emit("download-progress", progress)?;
    }
    app.emit("download-finished", &url)?;

    Ok(())
}
