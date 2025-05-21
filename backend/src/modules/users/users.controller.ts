import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from 'src/entities/entities/Users';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBody, ApiCookieAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from 'src/types/users';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //* example: GET http://localhost:3000/users
  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: 200, type: User, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }
  //* example: GET http://localhost:3000/users/username
  @Get('/:username')
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: 200, type: User, isArray: false })
  findByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  //* example: POST http://localhost:3000/users
  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CreateUserDto })
  addUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  //* example: PUT http://localhost:3000/users
  @Put()
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: 201 })
  @ApiBody({ type: UpdateUserDto })
  updateUser(@Body() user: Users) {
    return this.usersService.updateUser(user);
  }
  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiResponse({ status: 200 })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser({ id });
  }
}
