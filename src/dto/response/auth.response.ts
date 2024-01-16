import { BaseResponse } from "../response/response";

export class SignInResponse implements BaseResponse {
    data: SignInDataResponse;
    statusCode: number;
    statusMsg: string;
}

export class SignInDataResponse {
    accesstoken: string;
    refreshtoken: string;
    accessExpiredAt: string;
    refreshExpiredAt: string;
}