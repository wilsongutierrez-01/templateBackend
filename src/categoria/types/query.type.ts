export type QueryCategoriaType = {
  nombre?: { $regex: string; $options: string };
  descripcion?: { $regex: string; $options: string };
  estado?: { $regex: boolean; $options: string };
};
