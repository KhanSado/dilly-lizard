import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Query } from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBook(@Request() req, @Query('authorId') authorId: number,  @Body() createPostDto: CreateBookDto): Promise<Book>{
    return this.bookService.createBook(
      req.user.id,
      authorId, 
      createPostDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findBooksByUserId(@Request() req) {
    return this.bookService.findBooksByUserId(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateBook(@Request() req, @Param('id') bookId: string, @Body() bookData: any) {
    const userId = req.user.id;
    return this.bookService.updateBook(userId, bookId, bookData);
  }
}
