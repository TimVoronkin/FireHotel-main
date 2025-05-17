import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Unique user identifier', example: '550e8400-e29b-41d4-a716-446655440000' })
  uuid: string | null;

  @ApiProperty({ description: 'User name', example: 'John' })
  name: string | null;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  last_name: string | null;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  email: string | null;

  @ApiProperty({ description: 'User phone', example: '+123456789' })
  phone: string | null;

  @ApiProperty({ description: 'Login username', example: 'john_doe123' })
  username: string | null;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  password: string | null;

  @ApiProperty({ description: 'User role', example: 'worker' })
  role: 'worker' | 'admin';
}
