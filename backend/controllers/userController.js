import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

//@desc      Auth user & get tocken
//@route     post/ api/ users/ login
//@access    public

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
   generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password fptiojbhgiuosnf");
  }
});

//@desc      regidter user
//@route     post/ api/ users
//@access    public

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password} = req.body;

  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error ('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  }); 

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error ('Invalid user data')
  }
});

//@desc      logout user / clear cookie
//@route     post/ api/ users/ logout
//@access    private

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '',{
    httpOnly:true,
    expired : new Date(0)
  });
  res.status(200).json({message:'logged out successfully'});
});

//@desc      get user profile
//@route     get/ api/ users/ profile
//@access    private

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error ('User not found');
  }
});

//@desc      update user profile
//@route     put/ api/ users/ profile
//@access    private

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error ('User not Found');
  }
});

//@desc      get users
//@route     get/ api/ users
//@access    private/admin

const getUsers = asyncHandler(async (req, res, next) => {
  res.send("get users ");
});

//@desc      get user by ID
//@route     get/ api/ users/:id
//@access    private/admin

const getUserById = asyncHandler(async (req, res, next) => {
  res.send("get user by Id");
});

//@desc      delete users
//@route     delete/ api/ users/:id
//@access    private/admin

const deleteUser = asyncHandler(async (req, res, next) => {
  res.send("delete user  ");
});

//@desc      update user
//@route     put/ api/ users/:id
//@access    private/admin

const updateUser = asyncHandler(async (req, res, next) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};