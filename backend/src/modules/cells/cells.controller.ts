import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CellsService } from './cells.service';
import { Cells } from 'src/entities/entities/Cells';
import { ApiCookieAuth, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CreateCelLDto } from './dto/createCell.dto';
import { UpdateCellDto } from './dto/updateCell.dto';
import { Cell } from 'src/types/cells';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cells')
export class CellsController {
  constructor(private readonly cellsService: CellsService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: [Cell] })
  @ApiCookieAuth()
  async findAll(): Promise<Cells[]> {
    return this.cellsService.findAll();
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiProperty({ type: CreateCelLDto })
  @ApiResponse({ type: Cell })
  @ApiCookieAuth()
  async create(@Body() createCellDto: CreateCelLDto): Promise<Cells | object> {
    return this.cellsService.create(createCellDto);
  }

  @Put('/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiProperty({ type: UpdateCellDto })
  @ApiCookieAuth()
  async update(@Param('id') id: number, @Body() updateCellDto: UpdateCellDto) {
    return this.cellsService.update(id, updateCellDto);
  }
  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async remove(@Param('id') id: number) {
    return this.cellsService.remove(id);
  }
}
