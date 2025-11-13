import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { DmsController } from './dms/dms.controller';
import { DmsService } from './dms/dms.service';
import { DmsModule } from './dms/dms.module';
import { ImgdbModule } from './imgdb/imgdb.module';
import { VentasModule } from './ventas/ventas.module';
import { OrderModule } from './order/order.module';
import { CarrouselModule } from './carrousel/carrousel.module';
import { ServicesOrderModule } from './services-order/services-order.module';
import { ServicesTitleModule } from './services-title/services-title.module';
import { ServicesListModule } from './services-list/services-list.module';
import { RolesGuard } from './auth/guards/jwt-roles.guard';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory:  (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI')
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ProductoModule,
    CategoriaModule,
    DmsModule,
    ImgdbModule,
    VentasModule,
    OrderModule,
    CarrouselModule,
    ServicesOrderModule,
    ServicesTitleModule,
    ServicesListModule,
    MailModule
  ],
  controllers: [AppController, DmsController],
  providers: [AppService, DmsService, RolesGuard],
})
export class AppModule {}
