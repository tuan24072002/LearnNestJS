import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { compareHashPassword } from '@/utils/util';
import { JwtService } from '@nestjs/jwt';
import { CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      return null;
    }
    const isValidPassword = compareHashPassword(pass, user.password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id, email: user.email };
    return {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(register: CreateAuthDto) {
    return await this.usersService.register(register);
  }
  async checkCode(code: CodeAuthDto) {
    return await this.usersService.handleActive(code);
  }
  async resendCode(email: string) {
    return await this.usersService.resendCode(email);
  }
}
