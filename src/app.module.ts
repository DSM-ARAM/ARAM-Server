import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis'

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/../**/*.entity.{js, ts}'],
            migrations: [__dirname + '/**/migrations/*.js'],
            migrationsTableName: 'migrations',
            synchronize: true,
            autoLoadEntities: false,
            timezone: 'z'
        }),
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                readyLog: true,
                config: {
                    host: process.env.REDIS_HOST,
                    port: config.get<number>(process.env.REDIS_PORT),
                    password: process.env.REDIS_PASSWORD
                }
            })
        }),
        AuthModule
    ],
	controllers: [],
    providers: [],
})
export class AppModule {}