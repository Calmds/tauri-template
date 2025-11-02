use tauri::{AppHandle, Manager, PhysicalPosition, PhysicalSize, async_runtime};

/// 设置当前窗口居中
#[tauri::command]
pub fn set_center(window: tauri::Window) -> crate::Result<()> {
    match window.current_monitor()? {
        None => window.center()?,
        Some(screen) => {
            let screen_position = screen.position();
            let screen_size = PhysicalSize::<i32> {
                width: screen.size().width as i32,
                height: screen.size().height as i32,
            };

            let window_size = PhysicalSize::<i32> {
                width: window.outer_size().unwrap().width as i32,
                height: window.outer_size().unwrap().height as i32,
            };

            // when screen_position_x and screen_position_y both equal 0, the window is fullscreen
            // 当 screen_position_x 和 screen_position_y 都等于零时说明当前窗口处于全屏状态
            let screen_position_x =
                screen_position.x + ((screen_size.width / 2) - (window_size.width / 2));
            let screen_position_y = if screen_position.y == 0 && screen_position_x != 0 {
                (screen_size.height / 2) - (window_size.height / 2) - screen_position.y
            } else {
                screen_position.y
            };

            let physical_pos = PhysicalPosition {
                x: screen_position_x,
                y: screen_position_y,
            };

            window.set_position(tauri::Position::Physical(physical_pos)).unwrap();
        },
    }

    window.set_resizable(true).unwrap();

    Ok(())
}

/// 开屏画面
pub fn splashscreen(app: AppHandle) -> crate::Result<()> {
    let splashscreen_window = app.get_webview_window("splashscreen").unwrap();
    let main_window = app.get_webview_window("main").unwrap();

    async_runtime::spawn(async move {
        std::thread::sleep(std::time::Duration::from_secs(3));

        splashscreen_window.close().unwrap();
        main_window.show().unwrap();

        std::thread::sleep(std::time::Duration::from_secs(2));
    });

    Ok(())
}
