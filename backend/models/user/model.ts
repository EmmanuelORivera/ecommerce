import { model } from 'mongoose';
import { IUserDocument } from './types';
import UserSchema from './schema';

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;
