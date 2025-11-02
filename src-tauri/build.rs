use std::process::Command;

fn get_git_rev() -> Option<String> {
    let output = Command::new("git").args(["rev-parse", "--short", "HEAD"]).output().ok()?;

    if output.status.success() {
        String::from_utf8(output.stdout).ok()
    } else {
        None
    }
}

fn main() {
    println!("cargo:rerun-if-changed=src-tauri/tauri.conf.json");
    tauri_build::build();

    if let Some(rev) = get_git_rev() {
        println!("cargo:rustc-env=GIT_REV={}", rev);
    }
}
