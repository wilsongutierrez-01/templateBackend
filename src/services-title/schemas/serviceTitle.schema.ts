import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class ServiceTitle {
  @Prop({ required: true, unique: true, trim: true }) 
  title: string;

}

export const ServiceTitleSchema = SchemaFactory.createForClass(ServiceTitle);
