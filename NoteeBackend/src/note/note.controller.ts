import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(createNoteDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('all')
  findAllNote(@Body('userId') userId: string) {
    return this.noteService.findAllNote({userId});
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneNote(@Param('id') id: string) {
    return this.noteService.findOneNote(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateNote(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.updateNote(id, updateNoteDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeNote(@Param('id') id: string) {
    return this.noteService.removeNote(id);
  }
}
