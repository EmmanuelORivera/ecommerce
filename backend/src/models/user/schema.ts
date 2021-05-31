import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUserDocument, IUserModel } from './types';
const UserSchema: Schema<IUserDocument, IUserModel> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (
  this: IUserDocument,
  enteredPassword
) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export default UserSchema;
