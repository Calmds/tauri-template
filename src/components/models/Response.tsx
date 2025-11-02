import { PageResponse } from "./Pagination";
import { message, notification } from "antd";

export type EventResponse<T> = {
    readonly body: T,
    readonly keepAlive: string,
}

export class Response<T> {
    constructor(
        public readonly code: number,
        public readonly message: string,
        public readonly data?: T,
        public readonly page?: PageResponse
    ) { }

    get payload(): T | undefined {
        return this.data || {} as T;
    }

    get isError(): boolean {
        return this.code >= 400;
    }

    get isSuccess(): boolean {
        return this.code === 200;
    }

    handleError(): boolean {
        // 429 是后端 AntiDuplicateLayer 中返回的重复请求状态码
        if (this.code > 400 && this.code !== 429) {
            message.destroy();
            message.open({ type: 'error', duration: 10, content: this.message, });
        }

        if (this.code === 400) {
            notification.destroy();
            notification.warning({ duration: 10, placement: "top", message: "请求参数错误", description: this.message, });
        }

        return this.isError;
    }

    static isResponse(obj: any): obj is Response<any> {
        return obj &&
            typeof obj.code === 'number' &&
            typeof obj.message === 'string';
    }

    static fromJson<T>(json: any): Response<T> {
        // return Object.assign(new Response<T>(), json);
        return new Response(json.code, json.message, json.data, json.page);
    }
}









