import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({ description: 'Order ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Order Tracking ID', example: 'TFB-000001' })
  orderUuid: string | null;

  @ApiProperty({ description: 'Cell ID', example: 1 })
  cell_id: number;

  @ApiProperty({ description: 'Locker ID', example: 1 })
  locker_id: number;

  @ApiProperty({ description: 'Date From', example: '2025-05-17' })
  DateFrom: string;

  @ApiProperty({ description: 'Date To', example: '2025-05-20' })
  DateTo: string;

  @ApiProperty({ description: 'Name', example: 'Ivan' })
  Name: string;

  @ApiProperty({ description: 'Surname', example: 'Ivanov' })
  Surname: string;
}
