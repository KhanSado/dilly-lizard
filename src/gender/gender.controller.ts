import { Controller, Post, Body, Get, UseGuards, Request, Patch, Param} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/auth.guard';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { Gender } from './entities/gender.entity';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBook(@Request() req,  @Body() createGenderDto: CreateGenderDto): Promise<Gender>{
    const userId = req.user.id;
    return this.genderService.createGender(userId, createGenderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findBooksByUserId(@Request() req) {
    return this.genderService.findGenderById(req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateBook(@Request() req, @Param('id') authorId: number, @Body() bookData: any) {
    const userId = req.user.id;
    return this.genderService.updateGender(userId, authorId, bookData);
  }
}
