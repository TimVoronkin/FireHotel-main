import { ApiProperty } from '@nestjs/swagger';

export class Cell {
  @ApiProperty({ description: 'Cell id', example: 1, required: true })
  id: number;
  @ApiProperty({ description: 'Cell number', example: 1, required: true })
  cell_number: number;
  @ApiProperty({ description: 'Locker id', example: 1, required: true })
  locker_id: number;
  @ApiProperty({ description: 'Cell size', example: 's', required: true })
  size: 'studio' | '1br' | '2br' | '3br' | 'penthouse';
  @ApiProperty({ description: 'Cell status', example: 'free', required: true })
  status: 'free' | 'reserved';
  @ApiProperty({ description: 'Cell reserved until', example: '2022-01-01T10:30:00', required: false })
  reserved_until: Date;
  @ApiProperty({ description: 'Order id', example: 1, required: false })
  order_id: number;
  @ApiProperty({ description: 'Worker id', example: 1, required: false })
  worker_id: number;
}
