import { ApiProperty } from '@nestjs/swagger';

export class Lockers {
  @ApiProperty({ description: 'Locker id', example: 1, required: true })
  id: number;

  @ApiProperty({ description: 'Total cells', example: 5, required: true })
  total_cells: number;

  @ApiProperty({ description: 'Location', example: 'Prague, Czechia', required: true })
  location: string;

  @ApiProperty({ description: 'Name of the locker', example: 'Main Branch', required: true })
  name: string;

  @ApiProperty({ description: 'Description of the locker', example: 'Main branch locker', required: false })
  description: string;
}
