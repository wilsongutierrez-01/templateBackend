import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCarrouselDto } from './dto/create-carrousel.dto';
import { UpdateCarrouselDto } from './dto/update-carrousel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Carrousel } from './schemas/carrousel.schema';
import { Model } from 'mongoose';
import { DmsService } from 'src/dms/dms.service';
import { ImgdbService } from 'src/imgdb/imgdb.service';
import { ImageDocument } from 'src/imgdb/schemas/image.schema';
import { ImageType } from './types/image.type';

@Injectable()
export class CarrouselService {
  constructor(
    @InjectModel(Carrousel.name) private readonly carrouselModel: Model<Carrousel>,
    private readonly dmsService: DmsService,
    private readonly imageService: ImgdbService,
  ){}

  async create(createCarrouselDto: CreateCarrouselDto, image: Express.Multer.File) {
    const imageInfo: ImageDocument = await this.getImage(image);
    const { titulo, descripcion, btnTexto } = createCarrouselDto;

    const newCarrousel = new this.carrouselModel({
      titulo,
      descripcion,
      btnTexto,
      image: imageInfo._id,
    });

    try{
      await newCarrousel.save();
    }catch (error) {
      throw new ConflictException('Error al crear el carrousel');
    }

    return newCarrousel.populate('image');
  }

  async findAll() {
    const carrousels = await this.carrouselModel.find().populate('image');
    if (!carrousels) {
      throw new ConflictException('No se encontraron carrousels');
    }
    // for (const carrousel of carrousels) {
    //   const result = await this.dmsService.getPresignedUrl(carrousel.image._id);
    //   if (!result || !result.url) {
    //     throw new ConflictException('Error al obtener la URL de la imagen');
    //   }
    //   carrousel.image = {
    //     _id: carrousel.image._id,
    //     isPublic: false,
    //     url: result.url,
    //   };
    // }
    return carrousels;
  }

  async findOne(id: string) {
    const carrousel = await this.carrouselModel.findById(id).populate('image');
    if (!carrousel) {
      throw new ConflictException('No se encontró el carrousel');
    }
    // const result = await this.dmsService.getPresignedUrl(carrousel.image._id);
    // if (!result || !result.url) {
    //   throw new ConflictException('Error al obtener la URL de la imagen');
    // }
    // carrousel.image = {
    //   _id: carrousel.image._id,
    //   isPublic: false,
    //   url: result.url,
    // };
    return carrousel;
  }

  async update(id: string, updateCarrouselDto: UpdateCarrouselDto, image?: Express.Multer.File) {
    if(image) {
      const imageInfo: ImageDocument = await this.putImage(image, id);
      const { titulo, descripcion, btnTexto } = updateCarrouselDto;
      const carrouselUpdate = {
        titulo,
        descripcion,
        btnTexto,
        image: imageInfo._id,
      }

      const updateCarrousel = await this.carrouselModel.findByIdAndUpdate(
        id,
        carrouselUpdate,
        { new: true },
      )
      if (!updateCarrousel) {
        throw new ConflictException('No se encontró el carrousel');
      }
      return updateCarrousel.populate('image');
    }

    const { titulo, descripcion, btnTexto } = updateCarrouselDto;
    const carrouselUpdate = {
      titulo,
      descripcion,
      btnTexto,
    }
    const updateCarrousel = await this.carrouselModel.findByIdAndUpdate(
      id,
      carrouselUpdate,
      { new: true },
    )
    if (!updateCarrousel) {
      throw new ConflictException('No se encontró el carrousel');
    }
    return updateCarrousel.populate('image');
  }

  async remove(id: string) {
    const carrousel = await this.carrouselModel.findById(id).populate('image');
    const deleteCarrousel = await this.carrouselModel.findByIdAndDelete(id);
    const deleteFile = await this.imageService.deleteImage(carrousel.image._id);
    const deleteImage = await this.dmsService.deleteFile(carrousel.image._id);

    if (!deleteCarrousel || !deleteFile || !deleteImage) {
      throw new ConflictException('No se encontró el carrousel');
    }
    return {mesaage: 'Carrousel eliminado'};
  }

  async getImage(image: Express.Multer.File): Promise<ImageDocument> {
      const imageInfo: ImageType = await this.dmsService.uploadSingleFile({
        file: image,
        isPublic: true,
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
        isPublic: true,
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
