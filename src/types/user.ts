import { Document } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';

export enum USER_TYPES {
  ADMIN = 'admin',
  SELLER = 'seller',
  BUYER = 'buyer',
}

export interface UserDetail {
  id: string;
  name: string;
  email: string;
  type: USER_TYPES;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export type UserDocument = User & Document;
