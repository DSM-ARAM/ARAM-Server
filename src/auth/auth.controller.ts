import { Body, Controller, Get, Header, Headers, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest, EmailAuthRequest, VerifyingCodeRequest, FindPasswordRequest, ModifyPasswordRequest } from './dto/request';
import { EmailResponse, FindPasswordResponse, ModifyPasswordResponse, ResStruct, SignInResponse, token } from './dto/response';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
        this.authService = authService
    }

    @Post('/account')
    async signUp(@Body() request: SignUpRequest): Promise<ResStruct> {
        const data = await this.authService.signUp(request)

        return {
            data,
            statusCode: 201,
            statusMsg: '회원가입 성공'
        }
    }

    @Post('/')
    async signIn(@Body() request: SignInRequest): Promise<SignInResponse> {
        const data: token = await this.authService.signIn(request)

        return {
            data,
            statusCode: 201,
            statusMsg: '로그인 성공'
        }
    }
    
    @Post('/email')
    async email(@Body() request: EmailAuthRequest): Promise<EmailResponse>{
        const data = await this.authService.emailAuth(request)

        return {
            data,
            statusCode: 200,
            statusMsg: '인증 메일 발송 완료',
        }
    }

    @Post('/code')
    async verifyingCode(@Body() request: VerifyingCodeRequest): Promise<EmailResponse> {
        const data = await this.authService.verifyingCode(request)

        return {
            data,
            statusCode: 200,
            statusMsg: '코드 확인 완료'
        }
    }

    @Patch('/find')
    async findPassword(@Body() request: FindPasswordRequest): Promise<FindPasswordResponse> {
        const data = await this.authService.findPassword(request)

        return {
            data,
            statusCode: 200,
            statusMsg: '비밀번호 수정 완료'
        }
    }

    @Patch('/mod')
    async modifyPassword(
        @Headers('authorization') accesstoken: string,
        @Body() request: ModifyPasswordRequest): Promise<ModifyPasswordResponse>{
        const data = await this.authService.modifyPassword(accesstoken, request)
        
        return {
            data,
            statusCode: 200,
            statusMsg: '비밀번호 수정 완료'
        }
    }

    @Get('/verify')
    async verifyRefresh(@Headers('authorization') refreshtoken: string): Promise<SignInResponse> {
        const data = await this.authService.validateRefresh(refreshtoken)

        return {
            data,
            statusCode: 200,
            statusMsg: '토큰 갱신 완료'
        }
    }
}
