import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger';
import { Order } from 'src/types/orders';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  //   @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: 201, type: [Order] })
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({
    status: 201,
    example: { message: 'Order is created', order: { id: 1, orderUuid: 'TFB-000001', locker_id: 1, cell_id: 1 } },
  })
  create(@Body() order: CreateOrderDto) {
    console.log('ORDER BODY IN CONTROLLER:', order); // <-- log incoming body
    return this.ordersService.create(order);
  }

  @Put()
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({
    status: 201,
    example: { message: 'Order is updated', order: { id: 1, orderUuid: 'TFB-000001', locker_id: 1, cell_id: 1 } },
  })
  update(@Body() order: UpdateOrderDto) {
    return this.ordersService.update(order);
  }
  @Delete()
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: 201, example: { message: 'Order is deleted' } })
  delete(@Query('tn') order: string) {
    return this.ordersService.delete({ orderUuid: order });
  }
}
