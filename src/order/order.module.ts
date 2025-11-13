import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      }
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, RolesGuard],
})
export class OrderModule {}
