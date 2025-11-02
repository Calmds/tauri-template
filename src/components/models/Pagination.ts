export interface PageRequest {
    /// 当前页码
    pageNum: number,
    /// 每页显示条数
    pageSize: number,
}

export interface PageResponse {
    /// 当前页码
    pageNum: number,
    /// 每页显示条数
    pageSize: number,
    /// 总页数
    pages: number,
    /// 总条数
    rows: number,
}

export const defaultPageResponse = (): PageResponse => ({
    pageNum: 1,
    pageSize: 10,
    pages: 1,
    rows: 0,
});

//  设置默认一页响应条数
export const newPageResponse = (pageNum: number, pageSize: number): PageResponse => ({
    pageNum: pageNum,
    pageSize: pageSize,
    pages: 1,
    rows: 0,
});

export const defaultPage = (): PageRequest => newPage(1, 10);

export const newPage = (pageNum: number, pageSize: number): PageRequest => ({ pageNum, pageSize });