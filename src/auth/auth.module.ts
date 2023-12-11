import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { JwtModule } from '@nestjs/jwt';
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
        })
    ],
    providers: [
        AuthService
    ],
    controllers: [AuthController]
})
export class AuthModule {}
