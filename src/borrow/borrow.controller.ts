import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowService.create(createBorrowDto);
  }

  @Put('return/:id')
  returnBook(@Param('id', ParseIntPipe) id: number) {
    return this.borrowService.returnBook(id);
  }

  @Get('borrowed')
  borrowedBooks() {
    return this.borrowService.borrowedBooks();
  }

  @Get('users/:id/history')
  userBorrowingHistory(@Param('id', ParseIntPipe) id: number) {
    return this.borrowService.userBorrowingHistory(id);
  }

  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.borrowService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBorrowDto: UpdateBorrowDto,
  ) {
    return this.borrowService.update(id, updateBorrowDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.borrowService.remove(id);
  }
}
