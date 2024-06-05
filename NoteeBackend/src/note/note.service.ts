import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/user/prisma.service';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService){}
  async createNote  (createNoteDto: CreateNoteDto) {
    const { title, content, userId,categoryId } = createNoteDto;


    const existingNote = await this.prisma.note.findFirst({
      where: {
        AND: [
          { userId },
          { title }
        ]
      },
    });
    if (existingNote) {
      throw new Error('Une note avec ce titre existe deja');
    }
    const existinguser = await this.prisma.user.findUnique({
      where: {
        id:userId,
      },
    });
    if (!existinguser) {
      throw new Error('cet utilisateur n\'existe pas');
    }
    const existingcategory = await this.prisma.category.findUnique({
      where: {
        id:categoryId,
      },
    });
    if (!existingcategory) {
      throw new Error('cette categorie n\'existe pas');
    }

    const CreatedNote = await this.prisma.note.create({
      data: {
        title,
        content,
        userId,
        categoryId,
       
      },
    });
    const category = await this.prisma.category.findUnique({
      where: {
        id:categoryId,
      },
    });
    const listcategory = await this.prisma.category.findMany({
      where: {
        userId,
      },
      select:{
        id:true,
        name:true,
        color:true,
        notes:true,
      }
    
    })
    const listnotes = await this.prisma.note.findMany({
      where: {
        userId,
      },
      select
      :{
        id:true,
        title:true,
        content:true,
        userId:true,
        createdAt:true,
        category:true,
        categoryId:true,
      },
    });
    return {
      title: CreatedNote.title,
      content: CreatedNote.content,
      userId: CreatedNote.userId,
      categoryId:createNoteDto.categoryId,
      category: category,
      listcategory,
      listnotes,
    };
    
  }

  async findAllNote({ userId }: { userId: string }) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id:userId,
      },
    });
    if (!existingUser) {
      throw new Error('cet utilisateur n\'existe pas');
    }
    const notes = await this.prisma.note.findMany({
      where: {
        userId,
      },
      select
      :{
        id:true,
        title:true,
        content:true,
        userId:true,
        createdAt:true,
        category:true,
        categoryId:true,
      },
    });
    return notes;

    
  }

  async findOneNote(id: string) {
    const existingNote = await this.prisma.note.findUnique({
      where: {
        id,
      },
    });
    if (!existingNote) {
      throw new Error('cette note n\'existe pas');
    }
    const notes = await this.prisma.note.findUnique({
      where: {
        id,
      },
      select
      :{
        title:true,
        content:true,
        userId:true,
        createdAt:true,
        category:true,
      },
    });
    return notes
  }

  async updateNote(id: string, updateNoteDto: UpdateNoteDto) {
    const { title, content, categoryId } = updateNoteDto;
    const existingcategory = await this.prisma.category.findUnique({
      where: {
        id:categoryId,
      },
    });
    if (!existingcategory) {
      throw new Error('cette categorie n\'existe pas');
    }
    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
    const listnotes = await this.prisma.note.findMany({
      where: {
        userId:updatedNote.userId,
      },
      select
      :{
        id:true,
        title:true,
        content:true,
        userId:true,
        createdAt:true,
        category:true,
        categoryId:true,
      },
      
    });
    const listcategory = await this.prisma.category.findMany({
      where: {
        userId:updatedNote.userId,
      },
     
      select:{
        id:true,
        name:true,
        color:true,
        notes:true,
      }
    
    })
    const note= await this.prisma.note.findUnique({
        where:{
          id:updatedNote.id
        },
        select:{
          id:true,
          title:true,
          content:true,
          userId:true,
          createdAt:true,
          category:true,
          categoryId:true,
        }
    })
    return {
      note,
      listnotes,
      listcategory,

    }
  }

  async removeNote(id: string) {
    const note = await this.prisma.note.delete({
      where: { id },
    });

    const listnotes = await this.prisma.note.findMany({
      where: {
        userId:note.userId,
      },
      select
      :{
        id:true,
        title:true,
        content:true,
        userId:true,
        createdAt:true,
        category:true,
        categoryId:true,
      },
      
    });
    const listcategory = await this.prisma.category.findMany({
      where: {
        userId:note.userId,
      },
      select:{
        id:true,
        name:true,
        color:true,
        notes:true,
      }
    
    })
    return {
      listnotes,
      listcategory,

    }
  }
}
