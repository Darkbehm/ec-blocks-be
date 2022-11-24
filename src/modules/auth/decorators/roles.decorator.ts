import { SetMetadata } from '@nestjs/common';
import { USER_TYPES } from 'src/types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: USER_TYPES[]) => SetMetadata(ROLES_KEY, roles);
