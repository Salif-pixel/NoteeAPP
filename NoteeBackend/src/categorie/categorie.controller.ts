import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createCategorie(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categorieService.createCategorie(createCategorieDto);
  }

  @Post('all')
  @UseGuards(JwtAuthGuard)
  findAllCategorie(@Body('userId') userId: string) {
    return this.categorieService.findAllCategorie({userId});
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneCategorie(@Param('id') id: string) {
    return this.categorieService.findOneCategorie(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateCategorie(@Param('id') id: string, @Body() updateCategorieDto: UpdateCategorieDto) {
    return this.categorieService.updateCategorie(id, updateCategorieDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeCategorie(@Param('id') id: string) {
    return this.categorieService.removeCategorie(id);
  }
}
