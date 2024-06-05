import { Injectable } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { PrismaService } from 'src/user/prisma.service';

@Injectable()
export class CategorieService {
  constructor(private readonly prisma: PrismaService){}
  async createCategorie(createCategorieDto: CreateCategorieDto) {
    const { name,color,userId } = createCategorieDto;


    const existingCategorie = await this.prisma.category.findFirst({
      where: {
        AND: [
          { userId: userId },
          { name: name }
        ]
      },
    });
    if (existingCategorie) {
      throw new Error('Une Categorie avec ce nom existe deja');
    }
    const createcategorie = await this.prisma.category.create({
      data: {
        name,
        color,
        userId,
      },
    });
    const categories = await this.prisma.category.findMany({
      where: {
        userId,
      },
      select
      :{
        id:true,
        name:true,
        color:true,
        notes:true,
        userId:true,
      },
    });
    return {
      name: createcategorie.name,
      color: createcategorie.color,
      categories,
      
    };
    
  }

  async findAllCategorie({ userId }: { userId: string }) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id:userId,
      },
    });
    if (!existingUser) {
      throw new Error('cet utilisateur n\'existe pas');
    }
    const categories = await this.prisma.category.findMany({
      where: {
        userId,
      },
      select
      :{
        id:true,
        name:true,
        color:true,
        notes:true,
        userId:true,
      },
    });
    return categories;
  }

  async findOneCategorie(id: string) {
    const existingCategorie = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!existingCategorie) {
      throw new Error('cette categorie n\'existe pas');
    }
    const categorie = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select
      :{
        name:true,
        color:true,
      },
    });
    return categorie;
    
  }

  async updateCategorie(id: string, updateCategorieDto: UpdateCategorieDto) {
    const { name, color, } = updateCategorieDto;
    const existingcategory = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!existingcategory) {
      throw new Error('cette categorie n\'existe pas');
    }
    const updatedCategorie = await this.prisma.category.update({
      where: { id },
      data: updateCategorieDto,
    });
    const listnotes = await this.prisma.note.findMany({
      where: {
        userId:existingcategory.userId,
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
        userId:existingcategory.userId,
      },
      select
      :{
        id:true,
        name:true,
        color:true,
        notes:true,
        userId:true,
      },
    });
    const categorie= await this.prisma.category.findUnique({
        where:{
          id:updatedCategorie.id
        },
        select
        :{
          id:true,
          name:true,
          color:true,
          notes:true,
          userId:true,
        }
    });
   
    return {
      listcategory,
      listnotes,
      categorie,
    }
  }

  async removeCategorie(id: string) {
    const categorie = await this.prisma.category.delete({
      where: { id },
    });
    
    const listnotes = await this.prisma.note.findMany({
      where: {
        userId:categorie.userId,
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
        userId:categorie.userId,
      },
      select
      :{
        id:true,
        name:true,
        color:true,
        notes:true,
        userId:true,
      },
    });
    return {
      listcategory,
      listnotes,
    }
  }
}
