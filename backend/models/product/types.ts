import { Document, Model } from 'mongoose';
import { IReview } from '../review/types';
export class Product {
  constructor(
    public user: string,
    public name: string,
    public image: string,
    public brand: string,
    public category: string,
    public description: string,
    public reviews: IReview,
    public ratings: number,
    public numReviews: number,
    public price: number,
    public countInStock: number
  ) {}
}
export interface IProductDocument extends Product, Document {}

export interface IProductModel extends Model<IProductDocument> {}
