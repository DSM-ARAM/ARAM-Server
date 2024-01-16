import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInResponse } from 'src/dto/response/auth.response';
import { SignInRequest } from 'src/dto/request/auth.request';
import { ApiBody, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {
        this.authService = authService
    }

    @ApiOperation({summary: "로그인 API"})
    @ApiOkResponse({
        status: 200,
        description: "로그인 성공",
        type: SignInResponse
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "존재하지 않는 계정"
    })
    @ApiConflictResponse({
        status: 409,
        description: "비밀번호 불일치"
    })
    @ApiBody({
        type: SignInRequest
    })
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