import { IsNotEmpty, IsString } from "class-validator";

export class CreateServicesListDto {
  @IsString()
  @IsNotEmpty()
  service: string;

  @IsString()
  @IsNotEmpty()
  serviceTitle: string;
}
