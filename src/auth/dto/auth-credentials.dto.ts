/**
 * Define the DTO as a TS class (using the naming convention for DTO classes in NestJS)
 * This DTO helps, because if I want to modify the params, I can change them here,
 * and not go through all the files and modify them.
 */

import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must cointain at least: 1 upper case letter, 1 lowercase letter, 1 number or special character',
  })
  password: string;
}
