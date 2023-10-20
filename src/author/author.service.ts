import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { Author } from "./entities/author.entity";


@Injectable()
export class AuthorService {
  constructor(private prismaService: PrismaService) {}

  async createAuthor(userId: number, createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.prismaService.author.create({
      data: {
        name: createAuthorDto.name,
        lastname: createAuthorDto.lastname,
        user_owner: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAuthorByUserId(authorId: number) {
    return this.prismaService.author.findMany({
      where: {
        id: authorId,
      },
      include: {
        book: true,
        user_owner: true
      }
    });
  }

  // async updateAuthor(userId: number, bookId: string, bookData: any) {
  //   const existingBook = await this.prismaService.book.findUnique({
  //     where: { id: bookId },
  //   });

  //   if (!existingBook || existingBook.usersId !== userId) {
  //     throw new NotFoundException('Livro não encontrado');
  //   }
  //   return this.prismaService.book.update({
  //     where: { id: bookId },
  //     data: {
  //       title: bookData.title,
  //       subtitle: bookData.subtitle,
  //       sumary: bookData.sumary,
  //     },
  //   });
  // }
}
