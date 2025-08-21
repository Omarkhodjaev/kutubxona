import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BorrowService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createBorrowDto: CreateBorrowDto) {
    const user = await this.databaseService.user.findUnique({
      where: { id: createBorrowDto.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const book = await this.databaseService.book.findUnique({
      where: { id: createBorrowDto.bookId },
    });
    if (!book) throw new NotFoundException('Book not found');

    await this.databaseService.book.update({
      where: { id: createBorrowDto.bookId },
      data: { isAvailable: false },
    });

    return await this.databaseService.borrow.create({
      data: {
        userId: createBorrowDto.userId,
        bookId: createBorrowDto.bookId,
        borrowDate: new Date(createBorrowDto.borrowDate),
        returnDate: createBorrowDto.returnDate
          ? new Date(createBorrowDto.returnDate)
          : null,
      },
    });
  }

  async returnBook(id: number) {
    const borrow = await this.databaseService.borrow.findUnique({
      where: { id },
    });
    if (!borrow) throw new NotFoundException('Borrow record not found');

    await this.databaseService.book.update({
      where: { id: borrow.bookId },
      data: { isAvailable: true },
    });

    return await this.databaseService.borrow.update({
      where: { id },
      data: { returnDate: new Date() },
    });
  }

  async findAll() {
    const borrows = await this.databaseService.borrow.findMany({
      include: {
        user: true,
        book: true,
      },
    });

    return {
      message: 'All borrow records retrieved successfully',
      statusCode: 200,
      data: { borrows },
    };
  }

  async borrowedBooks() {
    const books = await this.databaseService.book.findMany({
      where: { isAvailable: false },
    });

    return {
      message: 'Currently borrowed books retrieved successfully',
      statusCode: 200,
      data: { books },
    };
  }

  async findOne(id: number) {
    const borrow = await this.databaseService.borrow.findUnique({
      where: { id },
      include: {
        user: true,
        book: true,
      },
    });
    if (!borrow) throw new NotFoundException('Borrow record not found');

    return {
      message: 'Borrow record retrieved successfully',
      statusCode: 200,
      data: { borrow },
    };
  }

  async update(id: number, updateBorrowDto: UpdateBorrowDto) {
    const borrow = await this.databaseService.borrow.findUnique({
      where: { id },
    });
    if (!borrow) throw new NotFoundException('Borrow record not found');

    const user = await this.databaseService.user.findUnique({
      where: { id: updateBorrowDto.userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const book = await this.databaseService.book.findUnique({
      where: { id: updateBorrowDto.bookId },
    });
    if (!book) throw new NotFoundException('Book not found');

    const updatedBorrow = await this.databaseService.borrow.update({
      where: { id },
      data: updateBorrowDto,
    });
    return {
      message: 'Borrow record updated successfully',
      statusCode: 200,
      data: { borrow: updatedBorrow },
    };
  }

  async remove(id: number) {
    const borrow = await this.databaseService.borrow.findUnique({
      where: { id },
    });
    if (!borrow) throw new NotFoundException('Borrow record not found');

    const deletedBorrow = await this.databaseService.borrow.delete({
      where: { id },
    });
    return {
      message: 'Borrow record deleted successfully',
      statusCode: 200,
      data: { borrow: deletedBorrow },
    };
  }
}
