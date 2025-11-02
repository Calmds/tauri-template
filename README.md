- 安装 tauri

```bash
# 创建项目的命令行工具
cargo install create-tauri-app --locked
# 命令行工具
cargo install tauri-cli --version "^2.0.0" --locked
```

- 安装 vite

```bash
npm i -g vite  
```

- Create a new directory for your project and initialize the frontend

```bash
npm create vite@latest .
```

- In your project directory, initialize Tauri:

```bash
cargo tauri init
```

- Verify your Tauri app is working by running the development server

```bash
cargo tauri dev
```
