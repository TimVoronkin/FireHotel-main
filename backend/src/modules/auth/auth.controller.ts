import { Body, Controller, Post, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiProperty({ description: 'Login user' })
  @ApiBody({ schema: { example: { username: 'john_doe', password: 'password1234' } } })
  @ApiResponse({
    status: 201,
    headers: {
      'Set-Cookie': {
        description: 'Access token cookie',
        example: 'access_token=token; Max-Age=3600; Path=/; Expires=Fri, 31 Dec 9999 23:59:59 GMT; ',
      },
      body: {
        description: 'Login success',
        example: { message: 'login success', id: 1 },
      },
    },
  })
  async login(@Body() body, @Response() res) {
    const { access_token, id, role } = await this.authService.login(body);
    return res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      })
      .send({ message: 'login success', id: id, isAdmin: role === 'admin' });
  }
}
