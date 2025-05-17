import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateLockerDto {
  @IsString()
  @ApiProperty({ description: 'Location', example: 'Prague, Czechia,  000/0 Bubenská, 000 00 ', required: true })
  location: string;
}
