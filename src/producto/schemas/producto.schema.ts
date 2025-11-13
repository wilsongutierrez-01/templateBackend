import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Categoria } from 'src/categoria/schemas/categoria.schema';
import { Image } from 'src/imgdb/schemas/image.schema';

@Schema({
  timestamps: true,
})
export class Producto {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ trim: true })
  descripcion: string;

  @Prop({ required: true, trim: true })
  precio: string;

  @Prop({ required: true, ref: 'Image', type: String })
  image: Image;

  @Prop({ required: true, trim: true })
  quantity: string; 

  @Prop({
    required: true,
    ref: 'Categoria',
    type: mongoose.Schema.Types.ObjectId,
  })
  categoria: Categoria;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
