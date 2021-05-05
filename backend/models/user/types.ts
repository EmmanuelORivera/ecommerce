import { Document, Model } from 'mongoose';

export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public isAdmin: boolean
  ) {}
}

export interface IUserDocument extends User, Document {}

export interface IUserModel extends Model<IUserDocument> {}
