import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SignUpRequest } from 'src/dto/request/user.request';
import { SignUpResponse } from 'src/dto/response/user.response';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {
        this.userService = userService
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
        await this.userService.signUp(request);

        return {
            data: null,
            statusCode: 201,
            statusMsg: '회원가입 완료'
        }
    }
}