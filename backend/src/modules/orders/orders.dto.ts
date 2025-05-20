import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, Validate } from 'class-validator';
import { IsTrackNumber } from 'src/common/isTrackNumber';

export class CreateOrderDto {
  @IsEmail()
  @ApiProperty({ description: 'Email', example: 'john@example.com', required: true })
  email: string;

  @IsNumber()
  @ApiProperty({ description: 'Cell id', example: 1, required: true })
  cell_id: number;

  @IsNumber()
  @ApiProperty({ description: 'Locker id', example: 1, required: true })
  locker_id: number;

  @IsNumber()
  @ApiProperty({ description: 'Worker id', example: 1, required: true })
  worker_id: number;

  @ApiProperty({ description: 'Date From', example: '2025-05-17', required: true })
  DateFrom: string;

  @ApiProperty({ description: 'Date To', example: '2025-05-20', required: true })
  DateTo: string;

  @ApiProperty({ description: 'Name', example: 'Ivan', required: true })
  Name: string;

  @ApiProperty({ description: 'Surname', example: 'Ivanov', required: true })
  Surname: string;
}

export class UpdateOrderDto {
  @Validate(IsTrackNumber)
  @ApiProperty({ description: 'Tracking number', example: 'TFB-000001', required: true })
  orderUuid: string;

  @ApiProperty({ description: 'Cell id', example: 1, required: false })
  cell_id: number;

  @ApiProperty({ description: 'Email', example: 'john@example.com', required: false })
  email: string;

  @ApiProperty({ description: 'Locker id', example: 1, required: false })
  locker_id: number;

  @ApiProperty({ description: 'Date From', example: '2025-05-17', required: false })
  DateFrom: string;

  @ApiProperty({ description: 'Date To', example: '2025-05-20', required: false })
  DateTo: string;

  @ApiProperty({ description: 'Name', example: 'Ivan', required: false })
  Name: string;

  @ApiProperty({ description: 'Surname', example: 'Ivanov', required: false })
  Surname: string;
}

export class DeleteOrderDto {
  @Validate(IsTrackNumber)
  @ApiProperty({ description: 'Tracking number', example: 'TFB-000001', required: true })
  orderUuid: string;
}
