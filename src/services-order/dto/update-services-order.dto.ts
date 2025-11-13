import { PartialType } from '@nestjs/mapped-types';
import { CreateServicesOrderDto } from './create-services-order.dto';

export class UpdateServicesOrderDto extends PartialType(CreateServicesOrderDto) {}
