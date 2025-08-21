import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBookDto: CreateBookDto) {
    const createdBook = await this.databaseService.book.create({
      data: createBookDto,
    });

    return {
      message: 'Book created successfully',
      statusCode: 201,
      data: { book: createdBook },
    };
  }

  async findAll() {
    const books = await this.databaseService.book.findMany();
    return {
      message: 'Books retrieved successfully',
      statusCode: 200,
      data: { books },
    };
  }

  async findOne(id: number) {
    const book = await this.databaseService.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return {
      message: 'Book retrieved successfully',
      statusCode: 200,
      data: { book },
    };
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const updatedBook = await this.databaseService.book.update({
      where: { id },
      data: updateBookDto,
    });

    return {
      message: 'Book updated successfully',
      statusCode: 200,
      data: { book: updatedBook },
    };
  }

  async remove(id: number) {
    const deletedBook = await this.databaseService.book.delete({
      where: { id },
    });

    return {
      message: 'Book deleted successfully',
      statusCode: 200,
      data: { book: deletedBook },
    };
  }
}
