import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatedProductoDto {
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
  quantity: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categoria: string;
}
