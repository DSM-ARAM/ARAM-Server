import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest, EmailAuthRequest } from './dto/request';
import { EmailResponse, ResStruct, SignInResponse, token } from './dto/response';

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
}
