import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DmsService } from 'src/dms/dms.service';
import { ImageType } from './types/image.type';
import { ImgdbService } from 'src/imgdb/imgdb.service';
import { ImageDocument } from 'src/imgdb/schemas/image.schema';
import { ProductoDto } from './dto/producto.dto';
import { Producto } from './schemas/producto.schema';
import { UpdatedProductoDto } from './dto/updateProducto.dto';
import { FilterProductoDto } from './dto/filterProducto.dto';
import { QueryProductoType } from './types/query.type';
@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name) private readonly productoModel: Model<Producto>,
    private readonly dmsService: DmsService,
    private readonly imageService: ImgdbService,
  ) {}

  async showProductos(
    page: number = 1,
    limit: number = 10,
    sort: string = 'nombre',
  ): Promise<{
    data: Producto[];
    page: number;
    limit: number;
    total: number;
  }> {
    const currentPage = Math.max(1, Number(page) || 1);
    const currentLimit = Math.max(1, Number(limit) || 10);
    const productos = await this.productoModel
      .find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('image')
      .populate('categoria');
    const count = await this.productoModel.countDocuments();

    // for (const producto of productos) {
    //   const result = await this.dmsService.getPresignedUrl(producto.image._id);
    //   if (!result || !result.url) {
    //     throw new ConflictException('Error al obtener la URL de la imagen');
    //   }
    //   producto.image = {
    //     _id: producto.image._id,
    //     isPublic: false,
    //     url: result.url,
    //   };
    // }
    return {
      data: productos,
      page: currentPage,
      limit: currentLimit,
      total: Number(count),
    };
  }

  async createProducto(
    producto: ProductoDto,
    image: Express.Multer.File,
  ): Promise<Producto> {
    const imageInfo: ImageDocument = await this.getImage(image);
    const { nombre, descripcion, precio, categoria, quantity } =
      producto;
    const productoDB = {
      nombre,
      descripcion,
      precio,
      categoria,
      quantity,
      image: imageInfo._id,
    };

    const newProducto = new this.productoModel(productoDB);

    try {
      await newProducto.save();
    } catch (error) {
      throw new ConflictException(
        'Error de validación: ' + JSON.stringify(error),
      );
    }
    return newProducto;
  }

  async getProducto(id: string): Promise<Producto> {
    const producto = await this.productoModel
      .findById(id)
      .populate('image')
      .populate('categoria');
    if (!producto) throw new ConflictException('Producto no encontrado');
    // const result = await this.dmsService.getPresignedUrl(producto.image._id);
    // if (!result || !result.url) {
    //   throw new ConflictException('Error al obtener la URL de la imagen');
    // }
    // producto.image = {
    //   _id: producto.image._id,
    //   isPublic: false,
    //   url: result.url,
    // };
    return producto;
  }

  async updateProducto(
    id: string,
    producto: UpdatedProductoDto,
    image?: Express.Multer.File,
  ): Promise<Producto> {
    if (image) {
      const imageInfo: ImageDocument = await this.putImage(image, id);
      const { nombre, descripcion, precio, quantity} = producto;
      const productoDB = {
        nombre,
        descripcion,
        precio,
        quantity,
        image: imageInfo._id,
      };

      const updatedProducto = await this.productoModel.findByIdAndUpdate(
        id,
        productoDB,
        { new: true },
      );

      if (!updatedProducto)
        throw new ConflictException('Producto no encontrado');

      return updatedProducto;
    }
    const { nombre, descripcion, precio, quantity } = producto;
    const productoDB = {
      nombre,
      descripcion,
      precio,
      quantity
    };

    const updatedProducto = await this.productoModel.findByIdAndUpdate(
      id,
      productoDB,
      { new: true },
    );

    if (!updatedProducto) throw new ConflictException('Producto no encontrado');

    return updatedProducto;
  }

  async getProductos(
    filterProducto: FilterProductoDto,
    page: number,
    limit: number,
    sort: string,
  ): Promise<{
    data: Producto[];
    page: number;
    limit: number;
    total: number;
  }> {
    const currentPage = Math.max(1, Number(page) || 1);
    const currentLimit = Math.max(1, Number(limit) || 10);
    const query: QueryProductoType = {};

    if (filterProducto.nombre)
      query.nombre = { $regex: filterProducto.nombre, $options: 'i' };
    if (filterProducto.descripcion)
      query.descripcion = { $regex: filterProducto.descripcion, $options: 'i' };
    if (filterProducto.precio)
      query.precio = { $regex: filterProducto.precio, $options: 'i' };
    if (filterProducto.categoria)
      query.categoria = filterProducto.categoria;
    const skip = (page - 1) * limit;

    const productos = await this.productoModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('image');

    const count = await this.productoModel.countDocuments(query);

    return {
      data: productos,
      page: currentPage,
      limit: currentLimit,
      total: Number(count),
    };
  }

  async deleteProducto(id: string): Promise<{ message: string }> {
    const producto = await this.productoModel.findById(id).populate('image');
    const deleteProducto = await this.productoModel.findByIdAndDelete(id);
    const deleteImage = await this.imageService.deleteImage(producto.image._id);
    const deleteFile = await this.dmsService.deleteFile(producto.image._id);

    if (!deleteProducto || !deleteImage || !deleteFile)
      throw new ConflictException('Error al eliminar el producto');
    return { message: 'Producto eliminado' };
  }

  async getImage(image: Express.Multer.File): Promise<ImageDocument> {
    const imageInfo: ImageType = await this.dmsService.uploadSingleFile({
      file: image,
      isPublic: false,
    });

    const imageDB = {
      _id: imageInfo.key,
      url: imageInfo.url,
      isPublic: imageInfo.isPublic,
    };

    const newImage = await this.imageService.createImage(imageDB);

    return newImage;
  }

  async putImage(
    image: Express.Multer.File,
    id: string,
  ): Promise<ImageDocument> {
    const deleteImage = await this.dmsService.deleteFile(id);
    if (!deleteImage) throw new ConflictException('Imagen no encontrada');

    const imageInfo: ImageType = await this.dmsService.uploadSingleFile({
      file: image,
      isPublic: false,
    });

    const imageDB = {
      _id: imageInfo.key,
      url: imageInfo.url,
      isPublic: imageInfo.isPublic,
    };

    const newImage = await this.imageService.createImage(imageDB);

    return newImage;
  }
}
