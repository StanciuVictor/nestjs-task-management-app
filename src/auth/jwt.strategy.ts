import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      // Must be the same secret as the one in Auth Module
      secretOrKey: configService.get('JWT_SECRET'),
      // Extract jwt token from the request header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Here (when this function is called) we already know that the token is valid.
   * We define here what we want to do after we know that the token is valid.
   * Tries to get the user from the database by his username.
   * If user is found, it is returned and Passport will inject it into the
   * request object of our Controller so we always have access to it
   * When the user is returned, Passport will inject it intro the request
   * object of the Controller, so we always have access to it
   *
   * @param {JwtPayload} payload
   * @return {*}  {Promise<User>}
   * @memberof JwtStrategy
   */
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
