import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ServiceTitle } from "src/services-title/schemas/serviceTitle.schema";

@Schema({timestamps: true})
export class ServiceList {
  @Prop({ required: true, unique: true, trim: true })
  service: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceTitle', required: true })
  serviceTitle: ServiceTitle
}

export const ServiceListSchema = SchemaFactory.createForClass(ServiceList);
