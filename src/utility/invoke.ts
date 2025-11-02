import { Dispatch, SetStateAction } from "react";
import { Response } from "@/components/models/Response";
import { invoke, InvokeArgs } from '@tauri-apps/api/core';
import { PageResponse } from "@/components/models/Pagination";

// 请求
type setPage = Dispatch<SetStateAction<PageResponse>>;
type SetDataState<T> = Dispatch<SetStateAction<T>>;
type SetData<T> = (data: T) => void;

export const invokeIpcNoParam = <T>(ipcName: string, setData?: SetData<T>, setPage?: setPage) => invokeIpc(ipcName, {}, setData, setPage);

export const invokeIpc = <T>(ipcName: string, request?: InvokeArgs, setData?: SetData<T>, setPage?: setPage) => {
    invoke<Response<T>>(ipcName, request).then(result => {
        if (!result.handleError()) {
            if (result.data && setData) setData(result.data);
            if (result.page && setPage) setPage(result.page);
        }
    }).catch(console.log);
}

export const invokeIpcHandle = <T>(ipcName: string, request: InvokeArgs, handler: (result: Response<T>) => void) => {
    invoke<Response<T>>(ipcName, request).then(result => handler(result)).catch(console.log);
}

/**
 * 
 * @param ipcName ipc 名称
 * @param setData 
 * @param setPage 
 * @returns 
 */
export const invokeIpcWithStateNoParam = <T>(ipcName: string, setData?: SetDataState<T>, setPage?: setPage) => invokeIpcWithState(ipcName, {}, setData, setPage);

export const invokeIpcWithState = <T>(ipcName: string, request?: InvokeArgs, setData?: SetDataState<T>, setPage?: setPage) => {
    invoke<Response<T>>(ipcName, request).then(result => {
        if (!result.handleError()) {
            if (result.data && setData) setData(result.data);
            if (result.page && setPage) setPage(result.page);
        }
    }).catch(console.log);
}

export const invokeIpcIgnoreData = (ipcName: string, request?: InvokeArgs, afterThen?: () => void) => {
    invoke<Response<any>>(ipcName, request).then(result => {
        if (!result.handleError()) {
            if (afterThen) afterThen();
        }
    }).catch(console.log);
}

export const invokeIpcHandleResponse = <T>(ipcName: string, request?: InvokeArgs, handleResponse?: (result: Response<T>) => void) => {

    invoke<Response<T>>(ipcName, request).then(result => {
        if (handleResponse) handleResponse(result);
    }).catch(console.log);
}

export const invokeIpcHandleError = <T>(ipcName: string, request?: InvokeArgs, handleResponse?: (result: Response<T>) => void) => {
    invoke<Response<T>>(ipcName, request).then(result => {
        if (result.isError) {
            if (handleResponse) handleResponse(result);
        }
    }).catch(console.log);
}