import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Delete} from '@nestjs/common';
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { CreatePublisherCompanyDto } from "./dto/create-publisher-company.dto";
import { PublisherCompany } from "./entities/publisher-company.entity";
import { PublisherCompanyService } from "./publisher-company.service";

@Controller('publisher-company')
export class PublisherCompanyController {
  constructor(private readonly publisherCompanyService: PublisherCompanyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createPublisherCompany(@Request() req,  @Body() createPublisherCompanyDto: CreatePublisherCompanyDto): Promise<PublisherCompany>{
    const userId = req.user.id;
    return this.publisherCompanyService.createPublisherCompany(userId, createPublisherCompanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findPublisherCompanysByUserId(@Request() req) {
    return this.publisherCompanyService.findPublisherCompanyByUserId(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updatePublisherCompany(@Request() req, @Param('id') authorId: string, @Body() bookData: any) {
    const userId = req.user.id;
    return this.publisherCompanyService.updatePublisherCompany(userId, authorId, bookData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePublisherCompany(@Request() req, @Param('id') authorId: string, @Body() bookData: any) {
    const userId = req.user.id;
    return this.publisherCompanyService.deletePublisherCompany(userId, authorId, bookData);
  }
}
