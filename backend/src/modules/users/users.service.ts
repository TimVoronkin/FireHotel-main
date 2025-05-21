import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/entities/Users';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from './dto/users.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private configService: ConfigService,
  ) {}

  //* get all users
  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }
  findByUsername(username: string) {
    const user = this.usersRepository.findOne({ where: { username } });
    return user;
  }
  //* add user
  async createUser(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const user = this.usersRepository.create(createUserDto);
    try {
      const isExist = await this.usersRepository.exists({ where: { username: user.username } });
      if (isExist) {
        return {
          message: `User ${user.username} already exists`,
        };
      }
      user.uuid = uuid();
      user.password = await bcrypt.hash(user.password, Number(this.configService.get('SALT_ROUNDS')));
      await this.usersRepository.save(user);
      return {
        message: `User ${user.username} created successfully`,
      };
    } catch (e) {
      console.warn(e);
      throw new HttpException(`User ${user.username} failed to create (email, phone, username already exist)`, 400);
    }
  }
  //* update user
  async updateUser(updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    const user = this.usersRepository.create(updateUserDto);
    const isExist = await this.usersRepository.exists({ where: { username: user.username } });
    if (!isExist) {
      return {
        message: `User ${user.username} does not exist`,
      };
    }
    if (user.password) {
      user.password = await bcrypt.hash(user.password, Number(this.configService.get('SALT_ROUNDS')));
    }
    this.usersRepository.update({ username: user.username }, user);
    return {
      message: `User ${user.username} updated successfully`,
    };
  }

  async deleteUser(deleteUserDto: DeleteUserDto): Promise<{ message: string }> {
    const isExist = await this.usersRepository.exists({ where: { id: deleteUserDto.id } });
    if (!isExist) {
      return {
        message: `User with id ${deleteUserDto.id} does not exist`,
      };
    }
    await this.usersRepository.delete({ id: deleteUserDto.id });
    return {
      message: `User with id ${deleteUserDto.id} deleted successfully`,
    };
  }
}
