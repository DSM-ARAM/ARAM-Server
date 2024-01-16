import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SignUpRequest } from 'src/dto/request/auth.request';
import { SignUpResponse } from 'src/dto/response/auth.response';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
        this.authService = authService
    }

    @ApiOperation({summary: "회원가입"})
    @ApiCreatedResponse({
        status: 201,
        description: "회원가입 완료",
        type: SignUpResponse
    })
    @ApiConflictResponse({
        status: 409,
        description: "이미 존재하는 이메일로 회원가입 시도"
    })
    @ApiBody({
        type: SignUpRequest
    })
    @Post('/account')
    async signUp(@Body() request: SignUpRequest): Promise<SignUpResponse> {
        await this.authService.signUp(request);

        return {
            data: null,
            statusCode: 201,
            statusMsg: '회원가입 완료'
        }
    }
}