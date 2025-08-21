import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const createdUser = await this.databaseService.user.create({
      data: createUserDto,
    });

    return {
      message: 'User created successfully',
      statusCode: 201,
      data: { user: createdUser },
    };
  }

  async findAll() {
    const users = await this.databaseService.user.findMany();
    return {
      message: 'Users retrieved successfully',
      statusCode: 200,
      data: { users },
    };
  }

  async findOne(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User retrieved successfully',
      statusCode: 200,
      data: { user },
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.email) {
      const emailExists = await this.databaseService.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      message: 'User updated successfully',
      statusCode: 200,
      data: { user: updatedUser },
    };
  }

  async remove(id: number) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this.databaseService.user.delete({
      where: { id },
    });

    return {
      message: 'User deleted successfully',
      statusCode: 200,
      data: { user: deletedUser },
    };
  }
}
