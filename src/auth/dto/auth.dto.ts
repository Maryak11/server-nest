import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'asd@gmail.com', description: 'Почта' })
  readonly email: string;

  @ApiProperty({ example: 'dfsdsd1231', description: 'Пароль' })
  readonly password: string;
}
