import { Injectable } from '@nestjs/common';
import { CreateServicesTitleDto } from './dto/create-services-title.dto';
import { UpdateServicesTitleDto } from './dto/update-services-title.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceTitle } from './schemas/serviceTitle.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicesTitleService {
  constructor(
    @InjectModel(ServiceTitle.name)
    private readonly serviceTitleModel: Model<ServiceTitle>,
  ) {}

  async create(serviceTitle: CreateServicesTitleDto) {
    const newService = new this.serviceTitleModel(serviceTitle);
    await newService.save();
    return newService;
  }

  async findAll() {
    const services = await this.serviceTitleModel.find().exec();
    return services;
  }

  async findOne(id: string) {
    const service = await this.serviceTitleModel.findById(id).exec();
    if (!service) {
      throw new Error(`Service with id ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateServicesTitleDto: UpdateServicesTitleDto) {
    const updatedService = await this.serviceTitleModel
      .findByIdAndUpdate(id, updateServicesTitleDto, { new: true })
      .exec();
    if (!updatedService) {
      throw new Error(`Service with id ${id} not found`);
    }
    return updatedService;
  }

  async remove(id: string) {
    const deletedService = await this.serviceTitleModel.findByIdAndDelete(id).exec();
    if (!deletedService) {
      throw new Error(`Service with id ${id} not found`);
    }
    return { message: 'Service deleted successfully' }
  }
}
