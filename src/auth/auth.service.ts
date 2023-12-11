import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInRequest, SignUpRequest } from './dto/request';
import { UserEntity } from './model/user.entity';
import * as bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';
import { SignInResponse, token } from './dto/response';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'

configDotenv()

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
        this.userRepository = userRepository
        this.jwtService = jwtService
        this.configService = configService
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
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('process.env.SECRET_REFRESH'),
        })
    }
}