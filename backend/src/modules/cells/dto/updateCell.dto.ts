import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateCellDto {
  @ApiProperty({ description: 'cell number', example: 1, required: false })
  cell_number: number;

  @ApiProperty({ description: 'locker id', example: 1, required: false })
  locker_id: number;

  @IsEnum(['studio', '1br', '2br', '3br', 'penthouse'])
  @ApiProperty({ description: 'cell size', example: 's', required: false })
  size: 'studio' | '1br' | '2br' | '3br' | 'penthouse';

  @IsEnum(['free', 'reserved'])
  @ApiProperty({ description: 'cell status', example: 'free', required: false })
  status: 'free' | 'reserved';

  @ApiProperty({ description: 'cell reserved until', example: '2022-01-01T10:30:00', required: false })
  reserved_until: Date;

  @ApiProperty({ description: 'order id', example: 1, required: false })
  order_id: number;

  @ApiProperty({ description: 'worker id', example: 1, required: false })
  worker_id: number;
}
