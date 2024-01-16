import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { SignInRequest } from 'src/dto/request/auth.request';
import { SignInDataResponse } from 'src/dto/response/auth.response';
import { UserRepository } from 'src/model/repository/user.repository';
import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Redis } from 'ioredis'

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private jwtService: JwtService,
        private mailerService: MailerService,
        @InjectRedis() private readonly redis: Redis,
    ){ 
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }

    /* 로그인 */
    async siginIn(request: SignInRequest): Promise<SignInDataResponse> {
        const { email, password } = request;
        const thisUser = await this.userRepository.findUserByEmail(email)

        if( !thisUser ) throw new NotFoundException();

        const hash = compareSync(password, thisUser.password);
        if(!hash) throw new ConflictException();

        const signInAt = Date.now() + 1000 * 3600 * 9
        const accessExpiredAt = new Date(signInAt + 1000 * 3600 * 3).toISOString()
        const refreshExpiredAt = new Date(signInAt + 1000 * 3600 * 24 * 14).toISOString()

        const accesstoken = await this.jwtService.signAsync({
            userId: thisUser.userId,
            signInAt
        }, {
            secret: process.env.SECRET_ACCESS,
            privateKey: process.env.SECRETORPRIVATE,
            expiresIn: '3h'
        })

        const refreshtoken = await this.jwtService.signAsync({
            userId: thisUser.userId,
            signInAt
        }, {
            secret: process.env.SECRET_REFRESH,
            privateKey: process.env.SECRETORPRIVATE,
            expiresIn: '14d'
        })

        await this.redis.set(`${thisUser.userId}signInAt`, signInAt)

        return {
            accesstoken,
            refreshtoken,
            accessExpiredAt,
            refreshExpiredAt
        }
    }
}