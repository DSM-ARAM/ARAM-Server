import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Logger } from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'prod'
          ? '.env.prod'
          : process.env.NODE_ENV === 'dev'
          ? '.env.dev'
          : '.env.local',
    }),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}