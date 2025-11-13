import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCarrouselDto {
  @IsString()
  @IsNotEmpty()
  titulo: string

  @IsString()
  @IsNotEmpty()
  descripcion: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  btnTexto: string
}
