import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    userName: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByName(userName);
    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña erróneos');
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new UnauthorizedException('Usuario o contraseña erróneos');
    }

    const tokenData = { userId: user.userId, userName: user.userName };
    return {
      access_token: await this.jwtService.signAsync(tokenData),
    };
  }
}
