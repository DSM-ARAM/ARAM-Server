import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInResponse } from 'src/dto/response/auth.response';
import { SignInRequest } from 'src/dto/request/auth.request';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {
        this.authService = authService
    }

    @Post('/')
    async signIn(@Body() request: SignInRequest): Promise<SignInResponse>{
        const data = await this.authService.siginIn(request);

        return {
            data,
            statusCode: 200,
            statusMsg: "로그인 성공"
        }
    }
}