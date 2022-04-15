import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // This module exports a service called JWT Service
    // Is async because we wait for the ConfigModule initialization to finish (see above), to then be available for Dependency Injection
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Whatever this func returns is going to be the config for this module
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          // JWT token expires in 3600 seconds = 1 hour
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  // This allows any other module that imports this AuthModule to use this authorization mechanism
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
