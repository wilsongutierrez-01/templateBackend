import { Injectable } from '@nestjs/common';
import { CreateServicesListDto } from './dto/create-services-list.dto';
import { UpdateServicesListDto } from './dto/update-services-list.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ServiceList } from './schemas/serviceList.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicesListService {
  constructor(
    @InjectModel(ServiceList.name)
    private readonly serviceListModel: Model<ServiceList>,
  ) {}

  create(createServicesListDto: CreateServicesListDto) {
    const newServiceList = new this.serviceListModel(createServicesListDto);
    return newServiceList.save();
  }

  findAll() {
    const servicesList = this.serviceListModel.find().populate('serviceTitle');
    if (!servicesList) {
      return 'No services found';
    }
    return servicesList;
  }

  findOne(id: string) {
    const serviceList = this.serviceListModel
      .findById(id)
      .populate('serviceTitle');
    if (!serviceList) {
      return `Service with id ${id} not found`;
    }
    return serviceList;
  }
  update(id: string, updateServicesListDto: UpdateServicesListDto) {
    const updatedServiceList = this.serviceListModel.findByIdAndUpdate(
      id,
      updateServicesListDto,
      { new: true },
    );
    return updatedServiceList;
  }


  remove(id: string) {
    const deletedServiceList = this.serviceListModel.findByIdAndDelete(id);
    if (!deletedServiceList) {
      return `Service with id ${id} not found`;
    }
    return {
      message: `Service with id ${id} has been deleted successfully`,
    };
  }
}
