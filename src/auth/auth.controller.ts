import { Body, Controller, Get, Header, Post, Request, UseGuards } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    console.log('authcredentials', authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDTO): Promise<object> {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  getUser(@Request() req): Promise<User> {
    console.log('user body', req.user);
    const { username } = req.user;
    return this.authService.getUser(username);
  }
}
