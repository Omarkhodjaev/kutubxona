import { IsDateString, IsNumber } from 'class-validator';

export class CreateBorrowDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookId: number;

  @IsDateString()
  borrowDate: string;

  @IsDateString()
  returnDate: string;
}
