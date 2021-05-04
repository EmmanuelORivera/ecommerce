import mongoose from 'mongoose';
import colors from 'colors';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(colors.cyan(`MongoDB Connected: ${conn.connection.host}`));
  } catch (error) {
    console.error(colors.red(`Error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
