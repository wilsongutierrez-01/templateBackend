import { Module } from '@nestjs/common';
import { CarrouselService } from './carrousel.service';
import { CarrouselController } from './carrousel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Carrousel, CarrouselSchema } from './schemas/carrousel.schema';
import { DmsService } from 'src/dms/dms.service';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';
import { ImgdbModule } from 'src/imgdb/imgdb.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Carrousel.name,
        schema: CarrouselSchema,
      }
    ]),
    ImgdbModule,
  ],
  controllers: [CarrouselController],
  providers: [CarrouselService, DmsService, RolesGuard],
})
export class CarrouselModule {}
