
// convert network data B to KB
export const convertBTo = (b: number) => {
    let kb: number = parseFloat((b / 1024).toFixed(2));
    let mb: number = parseFloat((kb / 1024).toFixed(2));
    let gb: number = parseFloat((mb / 1024).toFixed(2));
    if (mb > 1024) return gb + "/GB";
    if (kb > 1024) return mb + "/MB";
    return kb + "/KB";
}