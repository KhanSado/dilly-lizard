import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";


@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  async createBook(genderId: number, userId: number, authorId: number, createBookDto: CreateBookDto): Promise<Book> {
      return this.prismaService.book.create({
        data: {
          title: createBookDto.title,
          subtitle: createBookDto.subtitle,
          sumary: createBookDto.sumary,
          author: {
            connect: { id: Number(authorId) },
          },
          gender: {
            connect: { id: Number(genderId) }
          },
          user_owner: {
            connect: { id: userId },
          },
        },
      });
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

  async deleteBook(userId: number, bookId: string, bookData: any) {
    const existingBook = await this.prismaService.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook || existingBook.usersId !== userId) {
      throw new NotFoundException('Livro não encontrado');
    }
    return this.prismaService.book.deleteMany({
      where: { id: bookId }
    });
  }

  async insertBookImageCover(userId: number, bookId: string, bookCover: string) {
    const existingBook = await this.prismaService.book.findUnique({
      where: { id: bookId },
    });

    if (!existingBook || existingBook.usersId !== userId) {
      throw new NotFoundException('Livro não encontrado');
    }
    return this.prismaService.book.update({
      where: { id: bookId },
      data: {
        bookCover: bookCover
      },
    });
  }
}
