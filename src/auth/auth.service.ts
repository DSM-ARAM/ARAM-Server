import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { genSaltSync, hashSync } from 'bcrypt';
import { SignUpRequest } from 'src/dto/request/auth.request';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private mailerService: MailerService,
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailerService = mailerService;
    }
    
    /* 회원가입 */
    async signUp(request: SignUpRequest): Promise<void> {
        const { name, email, password, department } = request;

        const isExistEmail = await this.userRepository.findOneBy({ email });
        if(isExistEmail) throw new ConflictException();

        const salt = genSaltSync(this.configService.get<number>(process.env.SALTROUNDS))

        await this.userRepository.save({
            name,
            password: hashSync(password, salt),
            email,
            department,
        });
    }
}