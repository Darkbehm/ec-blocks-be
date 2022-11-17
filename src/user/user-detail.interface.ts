import { USER_TYPES } from './schemas/user.schema';

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
