import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';
import { RoleEnum } from '../../../enums/role.enums.js';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный формат email' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  firstName?: string;

  @IsOptional()
  @IsEnum(RoleEnum, { message: 'Роль может быть только coach или client' })
  role?: string;
}
