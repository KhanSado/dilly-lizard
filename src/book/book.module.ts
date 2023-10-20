import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthorService } from 'src/author/author.service';

@Module({
  controllers: [BookController],
  providers: [BooksService, PrismaService, AuthorService],
})
export class BookModule {}
