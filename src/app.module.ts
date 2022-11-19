import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';

ConfigModule.forRoot();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@${process.env.DATABASEURL}/?retryWrites=true&w=majority`,
    ),
    UserModule,
    AuthModule,
    StoreModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
