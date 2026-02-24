import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

import { User } from './user.entity';
import * as bcrpyt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrpyt.genSalt();
    const hashedPassword = await bcrpyt.hash(password, salt);

    const user = await this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('username already exists');
      } else throw new InternalServerErrorException();
    }
  }

  async isValidUser(authCredentialsDto: AuthCredentialsDTO): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ where: {username: username} });

    if (user && (await bcrpyt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('please check your login credentials');
    }
  }
  
}
