import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ROLES } from 'src/constants';

export class AdminDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsEnum(ROLES)
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  createdBy: string;

  @IsOptional()
  @ApiHideProperty()
  permissions: string[];
}
