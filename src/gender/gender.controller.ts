import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param, Delete} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createGender(@Request() req,  @Body() createGenderDto: CreateGenderDto): Promise<Gender>{
    const userId = req.user.id;
    return this.genderService.createGender(userId, createGenderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findGendersByUserId(@Request() req) {
    return this.genderService.findGenderByUserId(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateGender(@Request() req, @Param('id') authorId: string, @Body() bookData: any) {
    const userId = req.user.id;
    return this.genderService.updateGender(userId, authorId, bookData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteGender(@Request() req, @Param('id') authorId: string, @Body() bookData: any) {
    const userId = req.user.id;
    return this.genderService.deleteGender(userId, authorId, bookData);
  }
}
