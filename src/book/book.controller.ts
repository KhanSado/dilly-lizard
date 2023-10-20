import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBook(@Request() req,  @Body() createPostDto: CreateBookDto): Promise<Book>{
    return this.bookService.createBook(req.user.id, createPostDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findBooksByUserId(@Request() req) {
    return this.bookService.findBooksByUserId(req.user.id);
  }
}
