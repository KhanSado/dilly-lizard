import { Injectable } from "@nestjs/common";
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
}
