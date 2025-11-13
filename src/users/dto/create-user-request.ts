import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator'

export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()  
  @IsNotEmpty() 
  email: string;

  @IsString()
  @IsNotEmpty()
  direccion1: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  direccion2: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pais: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  distrito: string;

  @IsString()
  @IsNotEmpty()
  codigoPostal: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}