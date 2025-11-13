import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Categoria {
  @Prop({ required: true, trim: true })
  nombre: string;

  @Prop({ trim: true })
  descripcion?: string;

  @Prop({ default: true })
  estado?: boolean;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
