import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users';
import products from './data/products';
import UserModel from './models/user/model';
import ProductModel from './models/product/model';
import OrderModel from './models/order/model';
import connectDB from './config/db';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);

    const adminUser = createdUsers.find((user) => user.isAdmin);

    if (adminUser) {
      const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser };
      });
      await ProductModel.insertMany(sampleProducts);
      console.log(colors.green.inverse('Data Has Been Imported!'));
      process.exit();
    }
    throw new Error("admin user don't exist");
  } catch (error) {
    console.error(colors.red.inverse(`${error}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();
    await UserModel.deleteMany();

    console.log(colors.red.inverse('Data Has Been Destroyed!'));
    process.exit();
  } catch (error) {
    console.error(colors.red.inverse(`${error}`));
    process.exit(1);
  }
};
console.log(process.argv);
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
