import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  } else {
    throw new Error('NO JWT_SECRET');
  }
};

export default generateToken;
