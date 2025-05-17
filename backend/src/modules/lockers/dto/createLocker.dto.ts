import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLockerDto {
  @IsNumber()
  @ApiProperty({ description: 'Total cells', example: 5, required: true })
  total_cells: number;

  @IsString()
  @ApiProperty({ description: 'Location', example: 'Prague, Czechia,  000/0 Bubenská, 000 00 ', required: true })
  location: string;
}
