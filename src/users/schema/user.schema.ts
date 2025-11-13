import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class User {
  @Prop({ type: SchemaTypes.ObjectId, auto: true})
  _id: Types.ObjectId;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;
  
  @Prop({ unique: true })
  email: string;

  @Prop({ trim: true, required: true })
  direccion1: string;

  @Prop({ trim: true, required: false })
  direccion2: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true, default: "El Salvador", trim: true })
  pais: string;

  @Prop({ required: true, trim: true })
  ciudad: string;

  @Prop({ required: true, trim: true })
  distrito: string;

  @Prop({ required: true, trim: true })
  codigoPostal: string;

  @Prop()
  refreshToken?: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);