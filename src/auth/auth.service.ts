import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDetail } from 'src/models/user';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 16);
  }

  async register(user: Readonly<CreateUserDto>): Promise<UserDetail | string> {
    const userExists = await this.userService.findOneByEmail(user.email);

    if (userExists?.isDeleted) {
      return 'user with this email already exists, but is deleted';
    }
    if (userExists !== null) {
      return 'user with this email already exists';
    }

    const hashedPassword = await this.hashPassword(user.password);

    const newUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });
    return this.userService._getUsersDetail(newUser);
  }

  async comparePasswords(passsword: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(passsword, hashed);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetail | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user === null) return null;

    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return this.userService._getUsersDetail(user);
  }

  async login({
    email,
    password,
  }: ExistingUserDto): Promise<{ token: string } | null> {
    const user = await this.validateUser(email, password);
    if (user === null) return null;
    const token = await this.jwtService.signAsync(user);
    return { token };
  }
}
