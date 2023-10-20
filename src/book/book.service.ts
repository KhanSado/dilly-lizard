import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";


@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  async createBook(userId: number, createPostDto: CreateBookDto): Promise<Book> {
    return this.prismaService.book.create({
      data: {
        title: createPostDto.title,
        subtitle: createPostDto.subtitle,
        sumary: createPostDto.sumary,
        user_owner: {
          connect: { id: userId },
        },
      },
    });
  }

  async findBooksByUserId(userId: number) {
    return this.prismaService.book.findMany({
      where: {
        usersId: userId,
      },
    });
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
