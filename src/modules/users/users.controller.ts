import { Controller, Get, Patch, Delete, Param, Body, ParseUUIDPipe, Post, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.services.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { User } from './entities/user.entity.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDTO): Promise<User | void> {
    try {
      return await this.usersService.create(user);
    } catch (error) {
      if (error) {
        throw new HttpException(
          'The user with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id);
  }
}