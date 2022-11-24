import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { USER_TYPES } from 'src/types';
import { UserService } from 'src/modules/user/user.service';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<USER_TYPES[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    return this.compareRoles(user, requiredRoles);
  }

  async compareRoles(user: any, requiredRoles: USER_TYPES[]) {
    const userExists = await this.userService.findOne(user.id);
    return requiredRoles.some((type) => userExists?.type === type);
  }
}
