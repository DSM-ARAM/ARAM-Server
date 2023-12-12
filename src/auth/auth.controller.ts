import { Body, Controller, Get, Headers, HttpCode, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest, EmailAuthRequest, VerifyingCodeRequest, FindPasswordRequest, ModifyPasswordRequest, ModifyUserInfoRequest } from './dto/request';
import { EmailResponse, FindPasswordResponse, GetUserInfoResponse, ModifyPasswordResponse, ModifyUserInfoResponse, SignUpResponse, SignInResponse, token } from './dto/response';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {
        this.authService = authService
    }

    @ApiOperation({ summary: "회원가입 API", description: "회원가입 시 사용" })
    @ApiCreatedResponse({
        status: 201,
        description: "회원가입 성공",
        type: SignUpResponse,
    })
    @ApiConflictResponse({
        status: 409,
        description: "이미 사용된 이메일"
    })
    @ApiBody({ type: SignUpRequest })
    @Post('/account')
    async signUp(@Body() request: SignUpRequest): Promise<SignUpResponse> {
        const data = await this.authService.signUp(request)

        return {
            data,
            statusCode: 201,
            statusMsg: '회원가입 성공'
        }
    }

    @ApiOperation({ summary: "로그인 API", description: "이메일과 비밀번호를 사용해 로그인" })
    @ApiOkResponse({
        status: 200,
        description: "로그인 성공",
        type: SignInResponse,
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "존재하지 않는 계정 이메일"
    })
    @ApiConflictResponse({
        status: 409,
        description: "비밀번호 불일치"
    })
    @ApiBody({ type: SignInRequest })
    @HttpCode(200)
    @Post('/')
    async signIn(@Body() request: SignInRequest): Promise<SignInResponse> {
        const data: token = await this.authService.signIn(request)

        return {
            data,
            statusCode: 200,
            statusMsg: '로그인 성공'
        }
    }
    
    @ApiOperation({ summary: "이메일 인증 API", description: "입력된 이메일로 인증 번호 발송" })
    @ApiOkResponse({ 
        status: 200,
        description: "인증 메일 발송 완료",
        type: EmailResponse
    })
    @ApiBadRequestResponse({
        status: 400,
        description: "이메일 발송 관련 오류"
    })
    @ApiBody({ type: EmailAuthRequest })
    @HttpCode(200)
    @Post('/email')
    async email(@Body() request: EmailAuthRequest): Promise<EmailResponse>{
        const data = await this.authService.emailAuth(request)

        return {
            data,
            statusCode: 200,
            statusMsg: '인증 메일 발송 완료',
        }
    }

    @ApiOperation({ summary: "코드 인증 API", description: "이메일로 발송된 코드 인증" })
    @ApiOkResponse({
        status: 200,
        description: "코드 확인 완료",
        type: EmailResponse
    })
    @ApiConflictResponse({
        status: 409,
        description: "코드 불일치"
    })
    @ApiBody({ type: VerifyingCodeRequest })
    @HttpCode(200)
    @Post('/code')
    async verifyingCode(@Body() request: VerifyingCodeRequest): Promise<EmailResponse> {
        const data = await this.authService.verifyingCode(request)

        return {
            data,
            statusCode: 200,
            statusMsg: '코드 확인 완료'
        }
    }

    @ApiOperation({ summary: "비밀번호 찾기 API", description: "비로그인 상태에서 인증 이후 비밀번호 수정" })
    @ApiOkResponse({
        status: 200,
        description: "비밀번호 수정 완료",
        type: FindPasswordResponse
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "존재하지 않는 유저"
    })
    @ApiBody({ type: FindPasswordRequest })
    @Patch('/find')
    async findPassword(@Body() request: FindPasswordRequest): Promise<FindPasswordResponse> {
        const data = await this.authService.findPassword(request)

        return {
            data,
            statusCode: 200,
            statusMsg: '비밀번호 수정 완료'
        }
    }

    @ApiOperation({ summary: "비밀번호 수정 API", description: "로그인 상태에서 비밀번호 수정" })
    @ApiOkResponse({
        status: 200,
        description: "비밀번호 수정 완료",
        type: ModifyPasswordResponse
    })
    @ApiHeader({ name: "authorization", required: true, description: "액세스 토큰 / Bearer" })
    @ApiBody({ type: ModifyPasswordRequest })
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

    @ApiOperation({
        summary: "리프레시 토큰 인증 및 액세스 토큰 재발급 API",
        description: "리프레시 토큰 인증, 리프레시 토큰이 만료되지 않았을 경우 액세스 토큰 재발급"
    })
    @ApiOkResponse({
        status: 200,
        description: "토큰 갱신 완료",
        type: SignInResponse
    })
    @ApiHeader({name: "authorization", required: true, description: "리프레시 토큰 / Bearer"})
    @Get('/verify')
    async verifyRefresh(@Headers('authorization') refreshtoken: string): Promise<SignInResponse> {
        const data = await this.authService.validateRefresh(refreshtoken)

        return {
            data,
            statusCode: 200,
            statusMsg: '토큰 갱신 완료'
        }
    }

    @ApiOperation({ summary: "유저 정보 조회 API", description: "마이페이지에서 자신의 이름 및 부서 정보 조회" })
    @ApiOkResponse({
        status: 200,
        description: "유저 정보 조회 완료",
        type: GetUserInfoResponse
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "존재하지 않는 유저"
    })
    @ApiHeader({name: "authorization", required: true, description: "액세스 토큰 / Bearer"})
    @Get('/usr')
    async getUserInfo(@Headers('authorization') accesstoken: string): Promise<GetUserInfoResponse> {
        const data = await this.authService.getUserInfo(accesstoken)

        return {
            data,
            statusCode: 200,
            statusMsg: '유저 정보 조회 완료'
        }
    }

    @ApiOperation({ summary: "유저 정보 수정 API", description: "유저 정보 중 이름, 부서 수정 가능" })
    @ApiOkResponse({
        status: 200,
        description: "정보 수정 완료",
        type: ModifyUserInfoResponse
    })
    @ApiNotFoundResponse({
        status: 404,
        description: "존재하지 않는 유저"
    })
    @ApiHeader({ name: "authorization", required: true, description: "액세스 토큰 / Bearer" })
    @ApiBody({ type: ModifyUserInfoRequest })
    @Patch('/usr')
    async modifyUserInfo(
        @Headers('authorization') accesstoken: string,
        @Body() request: ModifyUserInfoRequest
    ): Promise<ModifyUserInfoResponse> {
        const data = await this.authService.modifiUserInfo(accesstoken, request)

        return {
            data,
            statusCode: 200,
            statusMsg: '정보 수정 완료'
        }
    }
}
