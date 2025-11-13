import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Producto } from 'src/producto/schemas/producto.schema';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, minlength: 5 })
  nombres: string;

  @Prop({ required: true, minlength: 5 })
  apellidos: string;

  @Prop({ required: true })
  pais: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true, minlength: 10 })
  direccion1: string;

  @Prop({ required: false, minlength: 10 })
  direccion2: string;

  @Prop({ required: true, minlength: 5 })
  ciudad: string;

  @Prop({ required: true, minlength: 5 })
  distrito: string;

  @Prop({ required: true,  })
  codigoPostal: string;

  @Prop({ required: true, ref: 'User', type: mongoose.Schema.Types.ObjectId })
  client: User;

  @Prop([
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: true },
    },
  ])
  productos: { producto: Producto; cantidad: number }[];

  @Prop({ required: true, })
  paymentMethod: string;

  @Prop({ required: true, default: "pendiente" })
  track: string;

  @Prop({ required: true, })
  total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
