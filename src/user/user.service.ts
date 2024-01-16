import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/entity/user.entity';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';
import { SignUpRequest } from 'src/dto/request/user.request';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private configService: ConfigService,
    ) {
        this.userRepository = userRepository;
        this.configService = configService;
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