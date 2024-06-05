// create-category.dto.ts

import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  color?: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
