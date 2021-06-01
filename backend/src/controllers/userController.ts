import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';
import HttpStatusCode from '../exceptions/enum';
import HttpException from '../exceptions/HttpException';
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
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
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

// desc     Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log({ user });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    next(new HttpException(HttpStatusCode.NOT_FOUND, 'User not found'));
  }
});
export { authUser, getUserProfile };
