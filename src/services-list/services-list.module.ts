import { Module } from '@nestjs/common';
import { ServicesListService } from './services-list.service';
import { ServicesListController } from './services-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceList, ServiceListSchema } from './schemas/serviceList.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ServiceList.name,
        schema: ServiceListSchema
      }
    ])
  ],
  controllers: [ServicesListController],
  providers: [ServicesListService],
})
export class ServicesListModule {}
