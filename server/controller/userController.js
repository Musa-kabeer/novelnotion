const path = require('path');
const multer = require('multer');
const User = require('../model/userModel');
const Post = require('../model/postModel');

const multerStorage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, path.dirname('public/img/users/user'));
 },

 filename: (req, file, cb) => {
  const ext = file.mimetype.split('/').at(-1);
  cb(null, `user-${Math.random()}-${Date.now()}.${ext}`);
 },
});

const multerFilter = (req, file, cb) => {
 if (file.mimetype.startsWith('image')) {
  cb(null, true);
 } else {
  cb('File requested must be an image', false);
 }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

const updateUserPhoto = upload.single('photo');

// UPDATE INFO
const updateUser = async (req, res, next) => {
 try {
  const data = {
   name: req.body.name,
   email: req.body.email,
   photo: req.file && req.file.filename,
  };

  const user = await User.findByIdAndUpdate(req.params.id, data, {
   new: true,
   runValidation: true,
  }).select('-__v');

  res.status(200).json({
   status: 'success',
   user,
  });
 } catch (err) {
  next(err);
 }
};

// UPDATE PASSWORD
const updatePassword = async (req, res, next) => {
 try {
  const user = await User.findById(req.user.id).select('+password');

  if (!user) return next('Try and log in again!');

  // COMPARE CONFIRM PASSWORD WITH CURRENT PASSWORD
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
   return next('Incorrect current password');
  }

  user.password = req.body.password;

  await user.save();

  res.status(200).json({
   status: 'success',
   message: 'Password updated successfully! 😘',
  });
 } catch (err) {
  next(err);
 }
};

// GET ALL USER
const getAllUser = async (req, res, next) => {
 try {
  const users = await User.find({ _id: { $ne: req.user.id } });

  res.status(200).json({
   status: 'success',
   results: users.length,
   data: {
    users,
   },
  });
 } catch (err) {
  next(err);
 }
};

// DELETE USER
const deleteUser = async (req, res, next) => {
 try {
  await Post.deleteMany({ id: { $eq: req.params.id } });

  await User.findByIdAndDelete(req.params.id);
 } catch (err) {
  next(err);
 }
};

module.exports = {
 updateUserPhoto,
 getAllUser,
 updatePassword,
 updateUser,
 deleteUser,
};
