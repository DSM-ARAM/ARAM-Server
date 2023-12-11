import { ApiProperty } from "@nestjs/swagger"
import { Contains, IsEmail } from "@nestjs/class-validator"

class SignUpRequest {
    constructor(
        userEmail: string,
        userPassword: string,
        userName: string,
        userDepartment: string
    ) { 
        this.userEmail = userEmail
        this.userPassword = userPassword
        this.userName = userName
        this.userDepartment = userDepartment
    }

    @ApiProperty({
        example: "asdf@dsm.hs.kr",
        description: "유일한 하나의 이메일"
    })
    userEmail: string

    @ApiProperty({
        example: "qwer1234asdf!",
        description: "이메일에 매핑될 비밀번호"
    })
    userPassword: string

    @ApiProperty({
        example: "홍길동",
        description: "사용자의 이름"
    })
    userName: string

    @ApiProperty({
        example: "가나다라부",
        description: "사용자의 소속 부서"
    })
    userDepartment: string
}

class SignInRequest{
    constructor(
        userEmail: string,
        userPassword: string,
    ) {
        this.userEmail = userEmail
        this.userPassword = userPassword
    }

    @ApiProperty({
        example: "asdf@dsm.hs.kr",
        description: "로그인할 하나의 이메일"
    })
    @IsEmail()
    @Contains('@dsm.hs.kr')
    userEmail: string

    @ApiProperty({
        example: "qwer1234asdf!",
        description: "이메일에 맞는 비밀번호"
    })
    userPassword: string
}

class EmailAuthRequest {
    constructor(
        userEmail: string
    ) {
        this.userEmail = userEmail
    }

    @ApiProperty({
        example: "asdf@dsm.hs.kr",
        description: ""
    })
    @IsEmail()
    @Contains('@dsm.hs.kr')
    userEmail: string
}

class VerifyingCodeRequest {
    constructor(
        userEmail: string,
        verifyCode: string
    ) {
        this.userEmail = userEmail
        this.verifyCode = verifyCode
    }

    @ApiProperty({
        example: 'asdf@dsm.hs.kr',
        description: '회원가입 시 입력한 이메일'
    })
    userEmail: string

    @ApiProperty({
        example: '012345',
        description: '메일로 발송된 인증 코드'
    })
    verifyCode: string
}

export {
    SignUpRequest,
    SignInRequest,
    EmailAuthRequest,
    VerifyingCodeRequest
}