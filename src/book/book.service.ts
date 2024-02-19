import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";


@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  async createBook(genderId: string, userId: string, authorId: string, publisherCompanyId: string, createBookDto: CreateBookDto): Promise<Book> {
      return this.prismaService.book.create({
        data: {
          title: createBookDto.title,
          subtitle: createBookDto.subtitle,
          sumary: createBookDto.sumary,
          isReading: Boolean(createBookDto.isReading),
          readed: Boolean(createBookDto.readed),
          qtdPages: Number(createBookDto.qtdPages),
          qtdRead: Number(createBookDto.qtdRead),
          lastRead: createBookDto.lastRead,
          author: {
            connect: { id: authorId },
          },
          gender: {
            connect: { id: genderId }
          },
          user_owner: {
            connect: { id: userId },
          },
          publisherCompany: {
            connect: { id: publisherCompanyId }
          }
        }        
      });
  }

  async findBooksByUserId(userId: string) {

    const books =  this.prismaService.book.findMany({
      where: {
        usersId: userId,
      },
      include: {
        user_owner: true, 
        publisherCompany: true,
        gender: true
      },
    });

    return books
  }

  async updateBook(userId: string, bookId: string, bookData: any) {
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

  async deleteBook(userId: string, bookId: string, bookData: any) {
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

  async insertBookImageCover(userId: string, bookId: string, bookCover: string) {
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
