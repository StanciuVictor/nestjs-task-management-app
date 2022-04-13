import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    //Service used for signing the tokens
    private jwtService: JwtService,
  ) {}

  /**
   * Takes the user credentials and sends them to the Repository to create a new user
   *
   * @param {AuthCredentialsDto} authCredentialDto
   * @return {*}  {Promise<void>}
   * @memberof AuthService
   */
  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialDto);
  }

  /**
   * Checks if there is a user with specified username, then if the passwords match.
   * If everything is ok, returns "success"
   *
   * @param {AuthCredentialsDto} authCredentialDto
   * @return {*}  {Promise<string>}
   * @memberof AuthService
   */
  async signIn(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;

    // Checks if there is a user with specified username
    const user = await this.usersRepository.findOne({ username });

    // If the user exists in the database AND if the passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      // Generate accessToken basen on payload
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials.');
    }
  }
}
