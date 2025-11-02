const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 Copyright 2023 Sal Rahman
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Encodes an array buffer as a base64 string
 * @param buffer An array buffer to encode
 * @returns A base64 encoded string
 */
export function encodeBase64(str: string) {
    const enc = new TextEncoder();
    const buffer: Uint8Array = enc.encode(str);

    const bytes = new Uint8Array(buffer);
    let i = 0, base64 = "";

    while (i < bytes.length) {
        const byte1 = bytes[i++] || 0;
        let byte2 = bytes[i++];
        let byte3 = bytes[i++];

        let padding = 0;

        if (byte2 === undefined) {
            padding++;
            byte2 = 0;
        }
        if (byte3 === undefined) {
            padding++;
            byte3 = 0;
        }

        const encoded1 = byte1 >> 2;
        const encoded2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
        let encoded3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
        let encoded4 = byte3 & 0x3f;

        if (padding === 1) encoded4 = 64;
        if (padding === 2) encoded3 = encoded4 = 64;

        base64 += `${BASE64_CHARS[encoded1]}${BASE64_CHARS[encoded2]}${BASE64_CHARS[encoded3]}${BASE64_CHARS[encoded4]}`;
    }

    return base64;
}

/**
 * Decodes a base64 string into an array buffer
 * @param base64 A base64 encoded string
 * @returns An array buffer
 */
export function decodeBase64(base64: string): string {
    if (!base64.match(/^[A-Za-z0-9+/]+={0,2}$/)) {
        throw new Error("Invalid base64 string");
    }

    const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
    const bytes = new Uint8Array((base64.length * 6) / 8 - padding);
    let i = 0, j = 0;

    while (i < base64.length) {
        const index1 = BASE64_CHARS.indexOf(base64[i++]);
        const index2 = BASE64_CHARS.indexOf(base64[i++]);
        const index3 = BASE64_CHARS.indexOf(base64[i++]);
        const index4 = BASE64_CHARS.indexOf(base64[i++]);

        const decoded1 = (index1 << 2) | (index2 >> 4);
        const decoded2 = ((index2 & 0x0f) << 4) | (index3 >> 2);
        const decoded3 = ((index3 & 0x03) << 6) | index4;

        bytes[j++] = decoded1;
        if (index3 !== 64) bytes[j++] = decoded2;
        if (index4 !== 64) bytes[j++] = decoded3;
    }

    return new TextDecoder("utf-8").decode(bytes.buffer);
}

/**
 * 将base64字符串转换为图片
 * @param base64String 图片的base64字符串
 * @returns 图片
 */
export function base64ToImage(base64String: string): HTMLImageElement {
    // Convert base64 to raw binary data held in a string
    let byteString = atob(base64String.split(',')[1]);

    // Separate out the mime component
    let mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // Create a blob from the ArrayBuffer
    let blob = new Blob([ab], { type: mimeString });

    // Create an Image object from the blob
    let image = new Image();
    image.src = URL.createObjectURL(blob);

    return image;
}