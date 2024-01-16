import { ApiProperty } from "@nestjs/swagger";

export class SignUpRequest {
    @ApiProperty({
        example: "asdf@dsm.hs.kr",
        description: "유일한 이메일"
    })
    email: string;

    @ApiProperty({
        example: "qwer1234",
        description: "이메일에 매핑될 비밀번호"
    })
    password: string;

    @ApiProperty({
        example: "홍길동",
        description: "사용자의 이름"
    })
    name: string;

    @ApiProperty({
        example: "가나다라부",
        description: "사용자의 소속 부서"
    })
    department: string;
}