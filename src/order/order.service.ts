import { Injectable } from '@nestjs/common';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async createOrder(orderData: any): Promise<Order> {
    const newOrder = new this.orderModel(orderData);
    return await newOrder.save();
  }

  async getOrders(): Promise<Order[]> {
  return this.orderModel
    .find()
    .populate('client')
    .populate({
      path: 'productos.producto',
      populate: {
        path: 'categoria',
      },
    });
  }

  async updateOrder(id: string, orderData: any): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(id
      , orderData, { new: true });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
  
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orderModel
      .find({ client: userId })
      .populate('client')
      .populate({
        path: 'productos.producto',
        populate: {
          path: 'categoria',
        },
      });
  }

  async getOrderById(id: string): Promise<Order> {
    return await this.orderModel.findById(id).exec();
  }
}
