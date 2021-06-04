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

UserSchema.pre('save', async function (this: IUserDocument, next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
export default UserSchema;
