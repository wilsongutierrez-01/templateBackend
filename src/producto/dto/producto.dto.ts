import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductoDto {
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  precio: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;
}
