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
import { ServicesListService } from './services-list.service';
import { CreateServicesListDto } from './dto/create-services-list.dto';
import { UpdateServicesListDto } from './dto/update-services-list.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('services-list')
export class ServicesListController {
  constructor(private readonly servicesListService: ServicesListService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createServicesListDto: CreateServicesListDto) {
    return this.servicesListService.create(createServicesListDto);
  }

  @Get()
  findAll() {
    return this.servicesListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesListService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateServicesListDto: UpdateServicesListDto,
  ) {
    return this.servicesListService.update(id, updateServicesListDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.servicesListService.remove(id);
  }
}
