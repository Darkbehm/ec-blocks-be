import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ExistingUserDto } from 'src/modules/user/dto/existing-user.dto';
import { UserDetail } from 'src/types';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<UserDetail | string> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: ExistingUserDto,
  ): Promise<{ token: string; user: UserDetail } | null> {
    return this.authService.login(user);
  }
}
