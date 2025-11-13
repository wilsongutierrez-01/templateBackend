import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterProductoDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  precio: string;
  
  @IsString()
  @IsOptional()
  categoria: string;
}
