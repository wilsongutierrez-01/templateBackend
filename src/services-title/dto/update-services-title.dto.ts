import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesTitleDto } from './create-services-title.dto';

export class UpdateServicesTitleDto extends PartialType(CreateServicesTitleDto) {}
