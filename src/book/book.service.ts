import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Book } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { AuthorService } from "src/author/author.service";


@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService, private authorService: AuthorService) {}

  async createBook(userId: number, authorId: number, createBookDto: CreateBookDto): Promise<Book> {

  const author = await this.authorService.findAuthorByUserId(authorId)

    if (author[0].usersId === userId) {
      return this.prismaService.book.create({
        data: {
          title: createBookDto.title,
          subtitle: createBookDto.subtitle,
          sumary: createBookDto.sumary,
          author: {
            connect: { id: Number(authorId) },
          },
          user_owner: {
            connect: { id: userId },
          },
        },
      });
    } else {
      throw new UnauthorizedException('O recurso author não pertence ao usuário.');
    }
  }

  async findBooksByUserId(userId: number) {

    const books =  this.prismaService.book.findMany({
      where: {
        usersId: userId,
      },
      include: {
        user_owner: true, 
        author: true
      },
    });

    return books
  }

  async updateBook(userId: number, bookId: string, bookData: any) {
    const existingBook = await this.prismaService.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook || existingBook.usersId !== userId) {
      throw new NotFoundException('Livro não encontrado');
    }
    return this.prismaService.book.update({
      where: { id: bookId },
      data: {
        title: bookData.title,
        subtitle: bookData.subtitle,
        sumary: bookData.sumary,
      },
    });
  }
}
