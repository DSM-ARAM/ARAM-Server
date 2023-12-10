import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpRequest } from './dto/request';
import { UserEntity } from './model/user.entity';
import * as bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';

configDotenv()

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) {
        this.userRepository = userRepository
    }

    async signUp(request: SignUpRequest): Promise<null> {
        const { userName, userEmail, userPassword, userDepartment } = request

        const isExistEmail = await this.userRepository.findOneBy({ userEmail })
        if (isExistEmail) throw new ConflictException()

        const salt = await bcrypt.genSaltSync(Number(process.env.SALTROUNDS))

        const hashedPassword = await bcrypt.hash(userPassword, salt, async (err, hash) => {
            await this.userRepository.save({
                userName,
                userPassword: hash,
                userEmail,
                userDepartment,
            })
        })

        return null
    }
}
