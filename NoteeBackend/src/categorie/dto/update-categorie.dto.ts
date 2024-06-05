

import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCategorieDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  color?: string;
}
