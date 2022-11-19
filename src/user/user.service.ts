import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserDetail, UserDocument } from 'src/models/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  _getUsersDetail(user: UserDocument): UserDetail {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      plan: user.plan,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isActive: user.isActive,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<UserDetail[]> {
    const users = await this.userModel
      .find({
        isDeleted: false,
      })
      .exec();
    return users.map((user) => this._getUsersDetail(user));
  }

  async findOne(id: string): Promise<UserDetail | null> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (user) {
      return this._getUsersDetail(user);
    }
    return null;
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel
      .findOne({
        email,
        isDeleted: false,
      })
      .exec();
    return user ?? null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      {
        ...updateUserDto,
        updatedAt: Date.now(),
      },
      { new: true },
    );
  }

  async remove(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate(
        { _id: id },
        {
          ...updateUserDto,
          updatedAt: Date.now(),
          isDeleted: true,
        },
        { new: true },
      )
      .exec();
  }
}
