import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ServicesOrderService } from './services-order.service';
import { CreateServicesOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('services-order')
export class ServicesOrderController {
  constructor(private readonly servicesOrderService: ServicesOrderService) {}

  @Post()
  create(@Body() createServicesOrderDto: CreateServicesOrderDto) {
    return this.servicesOrderService.create(createServicesOrderDto);
  }

  @Get()
  findAll() {
    return this.servicesOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesOrderService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateServicesOrderDto: UpdateServicesOrderDto) {
    return this.servicesOrderService.update(id, updateServicesOrderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.servicesOrderService.remove(id);
  }
}
