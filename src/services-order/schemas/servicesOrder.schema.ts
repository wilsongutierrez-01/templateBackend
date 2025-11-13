import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ServiceList } from 'src/services-list/schemas/serviceList.schema';
import { ServiceTitle } from 'src/services-title/schemas/serviceTitle.schema';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class ServicesOrder {
  @Prop({ required: true, trim: true })
  nombres: string;

  @Prop({ required: true, trim: true })
  correo: string;

  @Prop({ required: true, trim: true })
  telefono: string;

  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  client: User;

  @Prop({
    required: true,
    ref: 'ServiceTitle',
    type: mongoose.Schema.Types.ObjectId,
  })
  servicioTitulo: ServiceTitle;

  @Prop({
    required: true,
    ref: 'ServiceList',
    type: mongoose.Schema.Types.ObjectId,
  })
  servicio: ServiceList;

  @Prop({ required: true, trim: true })
  detalles: string;

  @Prop({ required: true, trim: true })
  track: string;
}

export const ServicesOrderSchema = SchemaFactory.createForClass(ServicesOrder);