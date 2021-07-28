import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken';
import HttpStatusCode from '../exceptions/enum';
import HttpException from '../exceptions/HttpException';
import User from '../models/user/model';

interface IUserInfo {
  name: string;
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
    next(error);
  }
});

// desc     Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body as IUserInfo;

  const userExists = await User.findOne({ email });

  if (userExists) {
    next(new HttpException(HttpStatusCode.BAD_REQUEST, 'User already exists'));
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(HttpStatusCode.CREATED).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    next(new HttpException(HttpStatusCode.BAD_REQUEST, 'Invalid user data'));
  }
});

// desc     Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
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

// desc     Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    next(new HttpException(HttpStatusCode.NOT_FOUND, 'User not found'));
  }
});
export { authUser, getUserProfile, registerUser, updateUserProfile };
