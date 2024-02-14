import { Module } from '@nestjs/common';
import { PublisherCompanyService } from './publisher-company.service';
import { PublisherCompanyController } from './publisher-company.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PublisherCompanyController],
  providers: [PublisherCompanyService, PrismaService],
})
export class PublisherCompanyModule {}
