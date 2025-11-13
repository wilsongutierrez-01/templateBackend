import { Injectable } from '@nestjs/common';
import { CreateServicesOrderDto } from './dto/create-services-order.dto';
import { UpdateServicesOrderDto } from './dto/update-services-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ServicesOrder } from './schemas/servicesOrder.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServicesOrderService {
  constructor(
    @InjectModel(ServicesOrder.name)
    private readonly servicesOrderModel: Model<ServicesOrder>,
  ) {}

  create(createServicesOrderDto: CreateServicesOrderDto) {
    const newOrder = new this.servicesOrderModel(createServicesOrderDto);
    return newOrder.save();
  }

  findAll() {
    const orders = this.servicesOrderModel
      .find()
      .populate({
        path: 'client',
        select: '-password -role -refreshToken'
      })
      .populate('servicioTitulo')
      .populate('servicio');
    return orders.exec();
  }

  findOne(id: string) {
    const order = this.servicesOrderModel
      .findById(id)
      .populate({
        path: 'client',
        select: '-password -role -refreshToken'
      })
      .populate('servicioTitulo')
      .populate('servicio');
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }
    return order.exec();
  }

  update(id: string, updateServicesOrderDto: UpdateServicesOrderDto) {
    const updatedOrder = this.servicesOrderModel.findByIdAndUpdate(
      id,
      updateServicesOrderDto,
      { new: true },
    );
    if (!updatedOrder) {
      throw new Error(`Order with id ${id} not found`);
    }
    return updatedOrder.exec();
  }

  remove(id: string) {
    const deletedOrder = this.servicesOrderModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      throw new Error(`Order with id ${id} not found`);
    }
    return {message: `Order with id ${id} deleted successfully`};
  }
}
