import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Query, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from '@prisma/client';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { skip } from 'node:test';

export const storage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/bookCovers');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${uniqueSuffix}${extension}`);
    },
  })
}

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBook(@Request() req, @Query('authorId') authorId: string, @Query('genderId') genderId: string, @Query('publisherCompanyId') publisherCompanyId: string, @Body() createPostDto: CreateBookDto): Promise<Book>{
    return this.bookService.createBook(
      genderId,
      req.user.id,
      authorId, 
      publisherCompanyId,
      createPostDto);
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // findBooksByUserId(@Request() req, @Query('skip') skip: Number = 0, @Query('take') take: Number = 20) {
  //   return this.bookService.findBooksByUserId(req.user.id, Number(skip), Number(take));
  // }
  @Get()
  @UseGuards(JwtAuthGuard)
  async findBooksByUserId(
    @Request() req,
    @Query('currentPage') page: number = 1, // Página padrão é 1
    @Query('pageSize') pageSize: number = 20 // Tamanho padrão da página é 20
  ) {
    const userId = req.user.id;
    const result = await this.bookService.findBooksByUserId(userId, page, pageSize, "http://localhost:3000/books");
    return { result };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateBook(@Request() req, @Param('id') bookId: string, @Body() bookData: any) {
    const userId = req.user.id;
    return this.bookService.updateBook(userId, bookId, bookData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteBook(@Request() req, @Param('id') bookId: string, @Body() bookData: any) {
    const userId = req.user.id;
    return this.bookService.deleteBook(userId, bookId, bookData);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', storage))
  @UseGuards(JwtAuthGuard)
  uploadFile(@Request() req, @Param('id') bookId: string, @UploadedFile() file){
      console.log(file);
      const userId = req.user.id;
      const imagePath =  file.path
      return this.bookService.insertBookImageCover(userId, bookId, imagePath);
  }
}
