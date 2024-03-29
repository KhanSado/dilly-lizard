import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateGenderDto } from "./dto/create-gender.dto";
import { Gender } from "@prisma/client";


@Injectable()
export class GenderService {
  constructor(private prismaService: PrismaService) {}

  async createGender(userId: string, createGenderDto: CreateGenderDto): Promise<Gender> {
    return this.prismaService.gender.create({
      data: {
        name: createGenderDto.name,
        description: createGenderDto.description,
        user_owner: {
          connect: { id: userId },
        },
      },
    });
  }

  async findGenderByUserId(userId: string) {
    return this.prismaService.gender.findMany({
      where: {
        usersId: userId,
      },
      include: {
        book: true,
        user_owner: true
      }
    });
  }

  async updateGender(userId: string, genderId: string, genderData: any) {
    const existingGender = await this.prismaService.gender.findUnique({
      where: { id: genderId },
    });

    if (!existingGender || existingGender.usersId !== userId) {
      throw new NotFoundException('Gender not found');
    }
    return this.prismaService.gender.update({
      where: { id: genderId },
      data: {
        name: genderData.name,
        description: genderData.lastname,
      },
    });
  }

  async deleteGender(userId: string, genderId: string, genderData: any) {
    const existingGender = await this.prismaService.gender.findUnique({
      where: { id: genderId },
    });

    if (!existingGender || existingGender.usersId !== userId) {
      throw new NotFoundException('Gender not found');
    }
    return this.prismaService.gender.deleteMany({
      where: { id: genderId }
    });
  }
}
