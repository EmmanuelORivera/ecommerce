import asyncHandler from 'express-async-handler';
import HttpStatusCode from '../exceptions/enum';
import HttpException from '../exceptions/HttpException';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import User from '../models/user/model';

interface IUserInfo {
  email: string;
  password: string;
}
// desc     Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body as IUserInfo;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    const error = new HttpException(
      HttpStatusCode.UNAUTHORIZED,
      'Invalid email or password'
    );
    console.log(error);
    next(error);
  }
});

export { authUser };
