import { Module } from '@nestjs/common';
import { ServicesOrderService } from './services-order.service';
import { ServicesOrderController } from './services-order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesOrder, ServicesOrderSchema } from './schemas/servicesOrder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ServicesOrder.name,
        schema: ServicesOrderSchema,
      }
    ])
  ],
  controllers: [ServicesOrderController],
  providers: [ServicesOrderService],
})
export class ServicesOrderModule {}
