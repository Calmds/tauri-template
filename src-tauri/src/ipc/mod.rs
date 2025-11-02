mod app;

pub use app::splashscreen;

/// Register all the ipc handlers
pub fn ipc_handlers() -> Box<tauri::ipc::InvokeHandler<tauri::Wry>> {
    Box::new(tauri::generate_handler![app::set_center,])
}
