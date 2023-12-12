import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailAuthRequest, FindPasswordRequest, ModifyPasswordRequest, SignInRequest, SignUpRequest, VerifyingCodeRequest } from './dto/request';
import { UserEntity } from './model/user.entity';
import * as bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
import { GetUserInfoServiceResponse, token, ValidateTokenResponse } from './dto/response';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { MailerService } from '@nestjs-modules/mailer';
import { setTimeout } from 'timers';
import { Redis } from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

configDotenv()

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailerService: MailerService,
        @InjectRedis() private readonly redis: Redis,
    ) {
        this.userRepository = userRepository
        this.jwtService = jwtService
        this.configService = configService
        this.mailerService = mailerService
        this.redis = redis
    }

    /** 회원가입 */
    async signUp(request: SignUpRequest): Promise<null> {
        const { userName, userEmail, userPassword, userDepartment } = request

        const isExistEmail = await this.userRepository.findOneBy({ userEmail })
        if (isExistEmail) throw new ConflictException()

        const salt = await bcrypt.genSaltSync(Number(process.env.SALTROUNDS))

        await bcrypt.hash(userPassword, salt, async (err, hash) => {
            await this.userRepository.save({
                userName,
                userPassword: hash,
                userEmail,
                userDepartment,
            })
        })

        return null
    }

    /** 로그인 */
    async signIn(request: SignInRequest): Promise<token>{
        const { userEmail, userPassword } = request

        const user = await this.userRepository.findOneBy({ userEmail })
        if (!user) throw new NotFoundException('존재하지 않는 계정 이메일')
        
        if(!bcrypt.compareSync(userPassword, user.userPassword)) throw new UnauthorizedException('비밀번호 불일치')

        const accesstoken = await this.generateAccess(user.userId)
        const refreshtoken = await this.generateRefresh(user.userId)

        return {
            accesstoken,
            refreshtoken
        }
    }

    /** 액세스토큰 생성 */
    async generateAccess(userId: number): Promise<string> {
        const payload = {
            userId : userId
        }
        return await this.jwtService.sign(payload, {
            secret: this.configService.get<string>('process.env.SECRET_ACCESS'),
        })
    }

    /** 리프레시토큰 생성 */
    async generateRefresh(userId: number): Promise<string>{
        const payload = {
            userId : userId
        }
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('process.env.SECRET_REFRESH'),
            expiresIn: '10d'
        })
    }

    /** 이메일 인증 */
    async emailAuth(request: EmailAuthRequest): Promise<null>{
        const { userEmail } = request

        configDotenv()

        const verifyCode: string | symbol = (Math.floor(Math.random() * 88889)).toString().padStart(6, '0')
        await this.redis.set(userEmail, verifyCode)

        const mailhtml = `
            <div id="mainvox" style="font-family: Pretendard; width:500px;">
                <h1 style="font-family: Pretendard; margin-bottom: 8px; font-size: 32px">인증 번호</h1>
                <div> 이메일 인증을 위한 인증 번호입니다. 아래 번호는 5분 뒤 만료됩니다.
                    <h3 style="background-color: #ededed; padding: 24px; font-size: 36px; letter-spacing: 12px; border-radius: 8px;">
                        ${verifyCode}
                    </h3>
                    직접 인증을 요청한 적이 없다면 개인정보가 도용되었을 수 있습니다. 
                    비밀번호 변경이 권장됩니다.
                </div>
            </div>
        `

        await this.mailerService.sendMail({
            from: process.env.EMAIL_ID,
            to: userEmail,
            text: '인증 코드 테스팅',
            subject: '[ARAM] 인증 메일입니다.',
            html: mailhtml
        })
            .then(res => {
                setTimeout(async () => {
                    await this.redis.set(userEmail, null)
                }, 1000 * 60 * 5)
            })
            .catch(err => {
                console.error(err)
                throw new BadRequestException()
            })

        return null
    }

    /** 인증 코드 확인 */
    async verifyingCode(request: VerifyingCodeRequest): Promise<string> {
        const { userEmail, verifyCode } = request

        const thisCode = await this.redis.get(userEmail)

        if (verifyCode !== thisCode) throw new ConflictException('코드 불일치')
        else {
            await this.redis.set(userEmail, null)
            return userEmail
        }
    }

    /** 비밀번호 찾기 */
    async findPassword(request: FindPasswordRequest): Promise<string> {
        const { userEmail, newPassword } = request

        const thisUser = await this.userRepository.findOneBy({ userEmail })
        if (!thisUser) throw new NotFoundException('존재하지 않는 유저')
        
        const salt = bcrypt.genSaltSync(Number(process.env.SALTROUNDS))
        const hash = bcrypt.hashSync(newPassword, salt)

        await this.userRepository.update({
            userId: thisUser.userId
        }, {
            userPassword: hash
        })

        return userEmail
    }

    /** 비밀번호 수정 */
    async modifyPassword(accesstoken: string, request: ModifyPasswordRequest): Promise<null> {
        const { userId } = await this.validateAccess(accesstoken)
        const { newPassword } = request 

        const salt = bcrypt.genSaltSync(Number(process.env.SALTROUNDS))
        const userPassword = bcrypt.hashSync(newPassword, salt)

        await this.userRepository.update({ userId }, { userPassword })

        return null
    }

    /** 액세스토큰 인증 */
    async validateAccess(accesstoken: string): Promise<null | ValidateTokenResponse> {
        const access: ValidateTokenResponse = await this.jwtService.verifyAsync(accesstoken.split(' ')[1], {
            secret: this.configService.get<string>('process.env.SECRET_ACCESS')
        })
        if (!access) return null
        
        return access
    }

    /** 리프레시 토큰 인증 */
    async validateRefresh(refreshtoken: string): Promise<null | token> {
        const refresh: ValidateTokenResponse = await this.jwtService.verify(refreshtoken.split(' ')[1], {
            secret: this.configService.get<string>('process.env.SECRET_REFRESH')
        })
        const accesstoken = await this.generateAccess(refresh.userId)
        if (!refresh) return null
        
        return {
            accesstoken,
            refreshtoken: refreshtoken.split(' ')[1]
        }
    }

    /** 유저 정보 조회 */
    async getUserInfo(accesstoken: string): Promise<GetUserInfoServiceResponse> {
        const { userId } = await this.validateAccess(accesstoken)
        const thisUser = await this.userRepository.findOneBy({ userId })

        return {
            userName: thisUser.userName,
            userDepartment: thisUser.userDepartment
        }
    }
}