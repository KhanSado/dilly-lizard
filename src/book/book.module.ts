import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthorService } from 'src/author/author.service';
import { PublisherCompanyService } from 'src/publisher-company/publisher-company.service';

@Module({
  controllers: [BookController],
  providers: [BooksService, PrismaService, AuthorService, PublisherCompanyService],
})
export class BookModule {}
