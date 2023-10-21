import { Injectable, NotFoundException } from "@nestjs/common";
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

  async findAuthorByUserId(userId: number) {
    return this.prismaService.author.findMany({
      where: {
        usersId: Number(userId),
      },
      include: {
        book: true,
        user_owner: true
      }
    });
  }

  async updateAuthor(userId: number, authorId: number, authorData: any) {
    const existingAuthor = await this.prismaService.author.findUnique({
      where: { id: Number(authorId) },
    });

    if (!existingAuthor || existingAuthor.usersId !== userId) {
      throw new NotFoundException('Author not found');
    }
    return this.prismaService.author.update({
      where: { id: Number(authorId) },
      data: {
        name: authorData.name,
        lastname: authorData.lastname,
      },
    });
  }
}
