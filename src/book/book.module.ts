import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BookController],
  providers: [BooksService, PrismaService],
})
export class BookModule {}
