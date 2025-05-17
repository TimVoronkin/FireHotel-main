import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    example: 'John',
    description: 'The name of the user',
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    required: true,
  })
  last_name: string;

  @IsEmail()
  @ApiProperty({
    example: 'john@example.com',
    description: 'The email of the user',
    required: true,
  })
  email: string;

  @IsPhoneNumber('CZ')
  @ApiProperty({
    example: '420123456789',
    description: 'The phone number of the user',
    required: true,
  })
  phone: string;

  @IsString()
  @ApiProperty({
    example: 'username',
    description: 'The username of the user',
    required: true,
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'password1234',
    description: 'The password of the user',
    required: true,
  })
  password: string;

  @IsString()
  @ApiProperty({
    example: 'worker',
    description: 'The role of the user',
    required: true,
  })
  role: 'worker' | 'admin';
}
export class UpdateUserDto {
  @IsString()
  @ApiProperty({ description: 'Username', example: 'john_doe', required: true })
  username: string;

  @IsString()
  @ApiProperty({ description: 'Name', example: 'john', required: false })
  name?: string | null;

  @IsString()
  @ApiProperty({ description: 'Last name', example: 'doe', required: false })
  last_name?: string | null;

  @IsEmail()
  @ApiProperty({ description: 'Email', example: 'john@example.com', required: false })
  email?: string;

  @IsPhoneNumber('CZ')
  @ApiProperty({ description: 'Phone', example: '+420123456789', required: false })
  phone?: string;

  @IsString()
  @ApiProperty({ description: 'Password', example: 'password1234', required: false })
  password?: string | null;
}

export class DeleteUserDto {
  @IsNumber()
  id: number;
}
