import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
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
        AuthModule
    ],
	controllers: [],
    providers: [],
})
export class AppModule {}