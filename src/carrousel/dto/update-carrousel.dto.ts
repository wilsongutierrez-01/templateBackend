import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCarrouselDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    titulo: string
  
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descripcion: string
  
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    btnTexto: string
}
