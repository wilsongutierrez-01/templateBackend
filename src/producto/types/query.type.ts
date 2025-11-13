import { Types } from 'mongoose';

export type QueryProductoType = {
  nombre?: { $regex: string; $options: string };
  descripcion?: { $regex: string; $options: string };
  precio?: { $regex: string; $options: string };
  categoria?: Types.ObjectId | string;
  estado?: { $regex: boolean; $options: string };
};
