import { model } from 'mongoose';
import { IOrderDocument } from './types';
import OrderSchema from './schema';

const OrderModel = model<IOrderDocument>('Order', OrderSchema);
export default OrderModel;
