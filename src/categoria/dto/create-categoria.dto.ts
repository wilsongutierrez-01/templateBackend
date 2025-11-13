import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
