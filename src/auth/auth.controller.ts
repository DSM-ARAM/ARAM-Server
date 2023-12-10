import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequest } from './dto/request';
import { ResStruct, SignUpResponse } from './dto/response';

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
}
