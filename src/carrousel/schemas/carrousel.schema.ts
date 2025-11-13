import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Image } from 'src/imgdb/schemas/image.schema';

@Schema()
export class Carrousel {
  @Prop({ required: true, trim: true })
  titulo: string;

  @Prop({ required: true, trim: true })
  descripcion: string;

  @Prop({
    required: true,
    trim: true,
    default: 'Ver testimonios o recomendaciones',
  })
  btnTexto: string;

  @Prop({ required: true, ref: 'Image', type: String })
  image: Image;
}

export const CarrouselSchema = SchemaFactory.createForClass(Carrousel);