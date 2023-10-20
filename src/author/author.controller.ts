import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBook(@Request() req,  @Body() createAuthorDto: CreateAuthorDto): Promise<Author>{
    const userId = req.user.id;
    return this.authorService.createAuthor(userId, createAuthorDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findBooksByUserId(@Request() req) {
    return this.authorService.findAuthorByUserId(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateBook(@Request() req, @Param('id') authorId: number, @Body() bookData: any) {
    const userId = req.user.id;
    return this.authorService.updateAuthor(userId, authorId, bookData);
  }
}
