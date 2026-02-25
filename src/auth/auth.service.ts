import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDTO): Promise<object> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    const payload: jwtPayload = {
      username: username,
    };

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = await this.jwtService.sign(payload, {
        expiresIn: 60 * 60,
      });
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException();
    }
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userRepository.findOne({where : {username: username}});
    if(!user) throw new NotFoundException();
    return user;
  }
}
