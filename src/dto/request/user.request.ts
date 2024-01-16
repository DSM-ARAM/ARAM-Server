import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "@nestjs/class-validator"

export class SignUpRequest {
    @ApiProperty({
        example: "asdf@dsm.hs.kr",
        description: "유일한 이메일"
    })
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        example: "qwer1234",
        description: "이메일에 매핑될 비밀번호"
    })
    @MaxLength(30, {message: "비밀번호는 8글자 이상 30글자 이하여야 합니다."})
    @MinLength(8, {message: "비밀번호는 8글자 이상 30글자 이하여야 합니다."})
    @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/g, {
        message : "비밀번호는 8자 이상 30자 이하의 대소문자 구분 없는 영문과 특수문자, 숫자가 1개 이상 포함되어야 합니다."
    })
    password: string;

    @ApiProperty({
        example: "홍길동",
        description: "사용자의 이름"
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: "가나다라부",
        description: "사용자의 소속 부서"
    })
    department: string;
}