import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';
import { UserModule } from './user/user.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [DatabaseModule, BooksModule, UserModule, BorrowModule],
})
export class AppModule {}
