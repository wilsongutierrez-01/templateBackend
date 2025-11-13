import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ServicesTitleService } from './services-title.service';
import { CreateServicesTitleDto } from './dto/create-services-title.dto';
import { UpdateServicesTitleDto } from './dto/update-services-title.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';

@Controller('services-title')
export class ServicesTitleController {
  constructor(private readonly servicesTitleService: ServicesTitleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createServicesTitleDto: CreateServicesTitleDto) {
    return this.servicesTitleService.create(createServicesTitleDto);
  }

  @Get()
  findAll() {
    return this.servicesTitleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesTitleService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateServicesTitleDto: UpdateServicesTitleDto,
  ) {
    return this.servicesTitleService.update(id, updateServicesTitleDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.servicesTitleService.remove(id);
  }
}
