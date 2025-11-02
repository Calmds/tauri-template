import { hashCode } from "./uuid";

// Actually reading from file should happen in `readAsArrayBuffer` (and as far we can tell it does)
export async function readFileSlice(file: File, start: number, end: number): Promise<ArrayBuffer | string | null> {
    const slice = file.slice(start, end);
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target && event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsArrayBuffer(slice);
    });
}

/**
 * readAsByteArray converts a File object to a Uint8Array.
 * This function is only used on the Apache Cordova platform.
 * See https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html#read-a-file
 * 
 * <code>
 * const file =  your File object; 
 * readAsByteArray(file)
 *  .then(bytes => console.log(bytes))
 *  .catch(error => console.error(error));
 * </code>
 */
export async function readAsByteArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ev => resolve(new Uint8Array(ev.target?.result as ArrayBuffer));
        reader.onerror = ev => reject(ev.target?.error)
        reader.readAsArrayBuffer(file);
    });
}

/**
 * readFile reads a File object and returns an ArrayBuffer, string or null.
 * 
 * @param file File object
 * @returns  Promise<ArrayBuffer | string | null>
 */
export async function readFile(file: File): Promise<ArrayBuffer | string | null> {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = ev => resolve(ev.target && ev.target.result);
        reader.onerror = err => reject(err);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * uriToBlob resolves a URI to a Blob object. This is used for
 * React Native to retrieve a file (identified by a file://
 * URI) as a blob.
 */
export async function uriToBlob(uri: URL | string): Promise<Blob | null> {
    return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = err => reject(err);
        xhr.open("GET", uri);
        xhr.send();
    });
}

/**
 * Generate a fingerprint for a file which will be used the store the endpoint
 *
 * @param {File} file
 * @param {Object} endpoint
 * @param {Function} callback
 */
export async function fingerprint(file: File, endpoint: string): Promise<string> {
    return await Promise.resolve([
        "tauri-br",
        file.name,
        file.type,
        file.size,
        file.lastModified,
        hashCode(endpoint)
    ].join("-").replace("/", ""));
}

/**
 * 将图片转换为 base64
 * @param file 图片
 * @returns  base64 字符串
 */
export const getFileBase64 = (file: Blob): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});
