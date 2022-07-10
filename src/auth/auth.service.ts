import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { createUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: AuthDto) {
    const condidate = await this.userService.getUserByEmail(dto.email);
    if (condidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: createUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if (!condidate) {
      throw new UnauthorizedException({
        message: 'Неверно введен Email или Пароль',
      });
    }

    const verifyPassword = await bcrypt.compare(
      userDto.password,
      condidate.password,
    );
    if (condidate && verifyPassword) {
      return condidate;
    }
    throw new UnauthorizedException({
      message: 'Неверно введен Email или Пароль',
    });
  }
}
