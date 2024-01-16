import { BaseResponse } from "./response";

export class SignUpResponse implements BaseResponse {
    data: null
    statusCode: 201
    statusMsg: "회원가입 완료"
}