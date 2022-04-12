import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * When a POST req comes on /signup route,
   * the app sends the parameters from the body of the req to the Service
   *
   * @param {AuthCredentialsDto} authCredentialDto
   * @return {*}  {Promise<void>}
   * @memberof AuthController
   */
  @Post('/signup')
  signUp(@Body() authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }
}
