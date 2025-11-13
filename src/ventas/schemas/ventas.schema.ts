import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Producto } from "src/producto/schemas/producto.schema";

@Schema({ timestamps: true })
export class Ventas {

  @Prop({ required: true })
  productos: Producto[];

}

export const VentasSchema = SchemaFactory.createForClass(Ventas);