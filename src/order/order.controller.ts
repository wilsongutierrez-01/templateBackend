import { BadRequestException, Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { Order } from './schemas/order.schema';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ObjectId } from 'bson';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getOrder(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getOrderById(id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post('create')
  async createOrder(@Body() orderData: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateOrder(@Param('id') id: string, @Body() orderData: Partial<CreateOrderDto>): Promise<Order> {
    if (!ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID');
    return this.orderService.updateOrder(id, orderData);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    if (!ObjectId.isValid(userId))
      throw new BadRequestException('Invalid user ID');
    return this.orderService.getOrdersByUserId(userId);
  }
}
