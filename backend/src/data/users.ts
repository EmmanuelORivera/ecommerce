import bcrypt from 'bcryptjs';
import { User } from '../models/user/types';

const adminUser = new User(
  'Admin User',
  'admin@example.com',
  bcrypt.hashSync('123456', 10),
  true
);
const john = new User(
  'John Doe',
  'john@example.com',
  bcrypt.hashSync('123456', 10)
);
const jane = new User(
  'Jane Doe',
  'jane@example.com',
  bcrypt.hashSync('123456', 10)
);

const users: Array<User> = [adminUser, john, jane];

export default users;
