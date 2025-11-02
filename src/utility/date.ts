class DateFormat {
    private date: Date;

    constructor() {
        this.date = new Date();
    }

    private get dateFormat(): { [key: string]: number } {
        return {
            "M+": this.date.getMonth() + 1,                   // 月份 
            "d+": this.date.getDate(),                        // 日 
            "H+": this.date.getHours(),                       // 小时 
            "m+": this.date.getMinutes(),                     // 分 
            "s+": this.date.getSeconds(),                     // 秒 
            "q+": Math.floor((this.date.getMonth() + 3) / 3), // 季度 
            "S": this.date.getMilliseconds()                  // 毫秒 
        };
    }

    public Format(fmt: string): string {
        let o = this.dateFormat;

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (match) => (this.date.getFullYear() + "").substr(4 - match.length));
                // fmt = fmt.replace(RegExp.$1, () => (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
        }

        return fmt;
    }
}

export const YMD = (): string => new DateFormat().Format("yyyy-MM-dd");

export const YMDHms = (): string => new DateFormat().Format("yyyy-MM-dd HH:mm:ss");

export const likeTimestamp = (): string => new DateFormat().Format("yyyyMMddHHmmss");

export const unixTimestampToTime = (time: number) => {
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero based
    let day = ("0" + date.getDate()).slice(-2);

    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};