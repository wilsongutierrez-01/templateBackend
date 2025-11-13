import { IsNotEmpty, IsString } from "class-validator";

export class CreateServicesTitleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
