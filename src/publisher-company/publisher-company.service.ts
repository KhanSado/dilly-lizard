import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherCompanyDto } from './dto/create-publisher-company.dto';
import { UpdatePublisherCompanyDto } from './dto/update-publisher-company.dto';
import { PrismaService } from 'src/prisma.service';
import { PublishingCompany } from '@prisma/client';

@Injectable()
export class PublisherCompanyService {
  constructor(private prismaService: PrismaService) {}

  async createPublisherCompany(userId: string, createPublisherCompanyDto: CreatePublisherCompanyDto): Promise<PublishingCompany> {
    return this.prismaService.publishingCompany.create({
      data: {
        name: createPublisherCompanyDto.name,
        user_owner: {
          connect: { id: userId },
        },
      },
    });
  }

  async findPublisherCompanyByUserId(userId: string) {
    return this.prismaService.publishingCompany.findMany({
      where: {
        usersId: userId,
      },
      include: {
        book: true,
        user_owner: true
      }
    });
  }

  async updatePublisherCompany(userId: string, publishingCompanyId: string, publishingCompanyData: any) {
    const existingPublishingCompany = await this.prismaService.publishingCompany.findUnique({
      where: { id: publishingCompanyId },
    });

    if (!existingPublishingCompany || existingPublishingCompany.usersId !== userId) {
      throw new NotFoundException('Publishing Company not found');
    }
    return this.prismaService.publishingCompany.update({
      where: { id: publishingCompanyId },
      data: {
        name: publishingCompanyData.name
      },
    });
  }

  async deletePublisherCompany(userId: string, publishingCompanyId: string, publisherCompanyData: any) {
    const existingPublishingCompany = await this.prismaService.publishingCompany.findUnique({
      where: { id: publishingCompanyId },
    });

    if (!existingPublishingCompany || existingPublishingCompany.usersId !== userId) {
      throw new NotFoundException('Publishing Company not found');
    }
    return this.prismaService.publishingCompany.deleteMany({
      where: { id: publishingCompanyId }
    });
  }
}
