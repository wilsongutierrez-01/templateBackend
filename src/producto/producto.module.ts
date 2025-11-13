import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { DmsService } from 'src/dms/dms.service';
import { ImgdbModule } from 'src/imgdb/imgdb.module';
import { Producto, ProductoSchema } from './schemas/producto.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/auth/guards/jwt-roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Producto.name,
        schema: ProductoSchema,
      },
    ]),
    ImgdbModule,
  ],
  controllers: [ProductoController],
  providers: [ProductoService, DmsService, RolesGuard],
})
export class ProductoModule {}
