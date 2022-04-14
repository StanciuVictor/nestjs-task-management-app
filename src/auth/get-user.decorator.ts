import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

/**
 * This custom decorator gets the HTTP Request
 * from the client and returns the user info
 */
export const GetUser = createParamDecorator(
  // data param is not used => prefix it with _ to eliminate linting warning
  // ctx stands for context
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
