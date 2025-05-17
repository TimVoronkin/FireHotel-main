import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateCelLDto {
  @IsNumber()
  @ApiProperty({ description: 'cell number', example: 1, required: true })
  cellNumber: number;

  @IsNumber()
  @ApiProperty({ description: 'locker id', example: 1, required: true })
  locker_id: number;

  @IsEnum(['studio', '1br', '2br', '3br', 'penthouse'])
  @ApiProperty({ description: 'cell size', example: 's', required: true })
  size: 'studio' | '1br' | '2br' | '3br' | 'penthouse';

  @IsEnum(['free', 'reserved'])
  @ApiProperty({ description: 'cell status', example: 'free', required: true })
  status: 'free' | 'reserved';
}
