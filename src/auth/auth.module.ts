import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config';

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
    providers: [
        AuthService
    ],
    controllers: [AuthController]
})
export class AuthModule {}
