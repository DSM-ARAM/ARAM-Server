import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/entity/user.entity';
import { UserRepository } from 'src/model/repository/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
		]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('SECRETORPRIVATE'),
                signOptions: {
                    expiresIn: '4h',
                },
                verifyOptions: {
                    complete: false
                }
            })
        }),
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: process.env.EMAIL_ID,
                    pass: process.env.EMAIL_PASSWORD
                }
            },
        }),
    ],
    providers: [AuthService, UserRepository],
    controllers: [AuthController]
})
export class AuthModule {}
