import { Document, Model } from 'mongoose';
import { Product } from '../product/types';
import { IUserDocument, User } from '../user/types';

interface IOrderItems {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Product;
}
export class Order {
  constructor(
    public user: User,
    public orderItems: Array<IOrderItems>,
    public shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    },
    public paymentMethod: string,
    public paymentResult: {
      id: string;
      status: string;
      update_time: string;
      email_address: string;
    },
    public taxPrice: number,
    public shippingPrice: number,
    public totalPrice: number,
    public isPaid: boolean,
    public paidAt: Date
  ) {}
}

export interface IOrderDocument extends Order, Document {}

export interface IOrderModel extends Model<IUserDocument> {}
