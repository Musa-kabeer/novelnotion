const path = require('path');
const multer = require('multer');
const Post = require('../model/postModel');

const multerStorage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, path.dirname('public/img/posts/images'));
 },

 filename: (req, file, cb) => {
  const ext = file.mimetype.split('/').at(-1);
  const origin = file.originalname.split('.').at(0);
  cb(null, `post-${origin + '-' + Math.random()}-${Date.now()}.${ext}`);
 },
});

const multerFilter = (req, file, cb) => {
 if (file.mimetype.startsWith('image')) {
  cb(null, true);
 } else {
  cb('File requested must be an image', false);
 }
};

const upload = multer({
 storage: multerStorage,
 fileFilter: multerFilter,
});

const uploadPostPhoto = upload.single('image');

// http://127.0.0.1:3000/api/v1/users/:userId/posts
// ALL POSTS
const getAllPost = async (req, res, next) => {
 try {
  let query = Post.find({});

  if (req.params.id) {
   query.find({ user: req.params.id });
  }

  // PAGINATION QUERY
  const limit = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;
  const skip = page * limit - limit;

  // STORING QUERY
  query = query.skip(skip).limit(limit);

  // EXECUTING QUERY
  const posts = await query;

  res.status(200).json({
   status: 'success',
   results: posts.length,
   data: {
    posts,
   },
  });
 } catch (err) {
  next(err);
 }
};

// GET POST
const getPost = async (req, res, next) => {
 try {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
   status: 'success',
   data: {
    post,
   },
  });
 } catch (err) {
  next(err);
 }
};

// CREATE POST
const createPost = async (req, res, next) => {
 try {
  const newPost = await Post.create({
   title: req.body.title,
   content: req.body.content,
   user: req.user.id,
   category: req.body.category,
   image: `/${req.file.filename}`,
  });

  res.status(201).json({
   status: 'success',
   data: {
    post: newPost,
   },
  });
 } catch (err) {
  next(err);
 }
};

// GET RELATED POST
const getRelatedPost = async (req, res, next) => {
 try {
  const related = await Post.find({
   _id: { $ne: req.params.id },
   category: req.params.category,
  })
   .skip(0)
   .limit(4);

  res.status(200).json({
   status: 'success',
   data: {
    posts: related,
   },
  });
 } catch (err) {
  next(err);
 }
};

const deletePost = async (req, res, next) => {
 try {
  await Post.findByIdAndDelete(req.params.id);
 } catch (err) {
  next(err);
 }
};

module.exports = {
 getAllPost,
 getPost,
 createPost,
 getRelatedPost,
 uploadPostPhoto,
 deletePost,
};
