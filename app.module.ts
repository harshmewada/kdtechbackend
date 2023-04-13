import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/lootdealsv2';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/.env.development',
      // isGlobal: true,
    }),
    MongooseModule.forRoot(DB_URL, {
      connectionFactory: (connection) => {
        console.info('connected to db');
        return connection;
      },
    }),
    AdminsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
