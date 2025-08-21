import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [DatabaseModule, BooksModule],
})
export class AppModule {}
