import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userRepsoitory:UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('context', context);
    const request = context.switchToHttp().getRequest();
    console.log('request', request);
    const token = this.extractTokenfromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log('payload', payload);
      const { username } = payload;
      console.log('username', username);
      const user = await this.userRepsoitory.findOne({where: {username: username}});
      console.log('user from db', user);

      // we are assigning the payload to the request object here
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenfromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}




