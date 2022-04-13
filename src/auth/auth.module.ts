import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // This module exports a service called JWT Service
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        // JWT token expires in 3600 seconds = 1 hour
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  // This allows any other module that imports this AuthModule to use this authorization mechanism
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
