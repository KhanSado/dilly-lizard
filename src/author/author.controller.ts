import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Delete} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createAuthor(@Request() req,  @Body() createAuthorDto: CreateAuthorDto): Promise<Author>{
    const userId = req.user.id;
    return this.authorService.createAuthor(userId, createAuthorDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAuthorsByUserId(@Request() req) {
    return this.authorService.findAuthorByUserId(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateAuthor(@Request() req, @Param('id') authorId: number, @Body() bookData: any) {
    const userId = req.user.id;
    return this.authorService.updateAuthor(userId, authorId, bookData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteAuthor(@Request() req, @Param('id') authorId: number, @Body() bookData: any) {
    const userId = req.user.id;
    return this.authorService.deleteAuthor(userId, authorId, bookData);
  }
}
