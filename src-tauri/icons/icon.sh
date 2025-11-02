#!/usr/bin/env sh
function cargo_icon() {
    cd ../../
    cargo tauri icon src-tauri/icons/icon.png
    cd -
}

# 获取图片的宽高
identify -format "%wx%h - %f\n" bee.png
# 重新调整图片的宽高，使用 cargo tauri icon 来生成 icon，那么对原文件大宽高必须是一样的！！！！
convert bee.png -background none -resize 500x500! icon.png

cargo_icon
# magick icon.png -background none -resize 128x128 -density 128x128 128x128.ico
# magick icon.png -background none -resize 32x32 -density 32x32 32x32.ico
# magick icon.png -background none -resize 16x16 -density 16x16 16x16.ico
# magick icon.png -background none icon.icns
# magick icon.png -background none icon.icn
