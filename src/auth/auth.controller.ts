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

  /**
   * When a POST req comes on route /signin, the app sends sends the
   * credentials to the Service for the sign in process
   *
   * @param {AuthCredentialsDto} authCredentialDto
   * @return {*}  {Promise<{ accessToken: string }>}
   * @memberof AuthController
   */
  @Post('/signin')
  signIn(
    @Body() authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }
}
