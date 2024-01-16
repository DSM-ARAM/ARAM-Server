import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
		]),
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}