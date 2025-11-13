import { Module } from '@nestjs/common';
import { ServicesTitleService } from './services-title.service';
import { ServicesTitleController } from './services-title.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceTitle, ServiceTitleSchema } from './schemas/serviceTitle.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ServiceTitle.name,
        schema: ServiceTitleSchema,
      }
    ])
  ],
  controllers: [ServicesTitleController],
  providers: [ServicesTitleService],
})
export class ServicesTitleModule {}
