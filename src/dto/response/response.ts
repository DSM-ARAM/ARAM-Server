export interface BaseResponse {
    data: object | null,
    statusCode: number,
    statusMsg: string,
}