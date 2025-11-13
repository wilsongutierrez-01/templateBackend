import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

class ProductoOrdenadoDto {
  @IsString()
  @IsNotEmpty()
  producto: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;
}
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  pais: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 100)
  direccion1: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(10, 100)
  direccion2: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  distrito: string;

  @IsString()
  @IsNotEmpty()
  codigoPostal: string;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsArray()
  @IsNotEmpty()
  productos: ProductoOrdenadoDto[];

  @IsString()
  @IsNotEmpty()
  @IsIn(['transferencia', 'contraentrega'])
  paymentMethod: string;

  @IsString()
  @IsOptional()
  track: string;

  @IsNumber()
  @IsNotEmpty()
  total: string;
}
