import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createBookDto: Prisma.BookCreateInput) {
    console.log(createBookDto);
    
    return this.databaseService.book.create({
      data: createBookDto,
    });
  }

  findAll() {
    return this.databaseService.book.findMany();
  }

  findOne(id: number) {
    return this.databaseService.book.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBookDto: Prisma.BookUpdateInput) {
    return this.databaseService.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  remove(id: number) {
    return this.databaseService.book.delete({
      where: { id },
    });
  }
}
