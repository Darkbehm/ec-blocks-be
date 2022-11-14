import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORDDB}@${process.env.DATABASEURL}/?retryWrites=true&w=majority"`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
