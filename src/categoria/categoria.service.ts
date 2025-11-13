import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './schemas/categoria.schema';
import { FilterCategoriaDto } from './dto/filterCategoria.dto';
import { QueryCategoriaType } from './types/query.type';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoriaModel: Model<Categoria>,
  ) {}

  async create(categoria: Categoria): Promise<Categoria> {
    const newCategoria = new this.categoriaModel(categoria);
    await newCategoria.save();
    return newCategoria;
  }

  async showCategorias(): Promise<Categoria[]> {
    const categorias = await this.categoriaModel.find().exec();
    return categorias;
  }

  async delete(id: string): Promise<{ message: string }> {
    const categoria = await this.categoriaModel.findByIdAndDelete(id).exec();
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    return { message: 'Categoria eliminada' };
  }

  async getCategoria(id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel.findById(id).exec();
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    return categoria;
  }

  async updateCategoria(id: string, categoria: Categoria): Promise<Categoria> {
    const updatedCategoria = await this.categoriaModel
      .findByIdAndUpdate(id, categoria, { new: true })
      .exec();
    if (!updatedCategoria)
      throw new NotFoundException('Categoria no encontrada');
    return updatedCategoria;
  }

  async getCategorias(
    filterCategoria: FilterCategoriaDto,
    page: number,
    limit: number,
    sort: string,
  ): Promise<{
    data: Categoria[];
    page: number;
    limit: number;
    total: number;
  }> {
    const query: QueryCategoriaType = {};

    if (filterCategoria.nombre)
      query.nombre = { $regex: filterCategoria.nombre, $options: 'i' };
    if (filterCategoria.estado)
      query.estado = { $regex: filterCategoria.estado, $options: 'i' };
    if (filterCategoria.descripcion)
      query.descripcion = {
        $regex: filterCategoria.descripcion,
        $options: 'i',
      };

    const skip = (page - 1) * limit;

    const categorias = await this.categoriaModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await this.categoriaModel.countDocuments(query);

    return {
      data: categorias,
      page,
      limit,
      total: count,
    };
  }
}
