import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateServicesOrderDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsString()
  @IsNotEmpty()
  servicioTitulo: string; 

  @IsString()
  @IsNotEmpty()
  servicio: string; 

  @IsString()
  @IsNotEmpty()
  detalles: string;

  @IsString()
  @IsNotEmpty()
  track: string;
}
