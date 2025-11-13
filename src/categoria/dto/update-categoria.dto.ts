import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
