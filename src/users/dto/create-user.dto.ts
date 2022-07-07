import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty({ example: 'test@test.ru', description: 'Почта' })
  readonly email: string;

  @ApiProperty({ example: 'dfsdsd1231', description: 'Пароль' })
  readonly password: string;
}
