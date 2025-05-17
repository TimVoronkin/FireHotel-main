import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { Locker } from 'src/entities/entities/Locker';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiCookieAuth, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CreateLockerDto } from './dto/createLocker.dto';
import { UpdateLockerDto } from './dto/updateLocker.dto';
import { Lockers } from 'src/types/lockers';

@Controller('lockers')
export class LockersController {
  constructor(private readonly lockersService: LockersService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: Lockers })
  @ApiCookieAuth()
  findAll(): Promise<Locker[]> {
    return this.lockersService.findAll();
  }
  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiProperty({ type: CreateLockerDto })
  @ApiResponse({
    status: 200,
    type: Lockers,
    example: {
      message: 'Locker is created',
      locker: { id: 1, total_cells: 5, location: 'Prague, Czechia,  000/0 Bubenská, 000 00' },
    },
  })
  @ApiCookieAuth()
  create(@Body() createLockerDto: CreateLockerDto) {
    return this.lockersService.create(createLockerDto);
  }

  @Put('/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiProperty({ type: UpdateLockerDto })
  @ApiResponse({ status: 200, type: CreateLockerDto })
  @ApiCookieAuth()
  update(@Param('id') id: number, @Body() updateLockerDto: UpdateLockerDto) {
    return this.lockersService.update(id, updateLockerDto);
  }
  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  remove(@Param('id') id: number) {
    return this.lockersService.remove(id);
  }
}
