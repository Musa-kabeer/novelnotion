const Comment = require('../model/commentModel');

// CREATE COMMENT
const createComment = async (req, res, next) => {
 try {
  const newComment = await Comment.create({ ...req.body, user: req.user.id });

  res.status(201).json({
   status: 'success',
   data: newComment,
  });
 } catch (err) {
  next(err);
 }
};

const getAllComment = async (req, res, next) => {
 try {
  const comment = await Comment.find().select('-__v');

  res.status(200).json({
   status: 'success',
   results: comment.length,
   data: {
    comment,
   },
  });
 } catch (err) {
  next(err);
 }
};

const getComment = async (req, res, next) => {
 try {
  const comment = await Comment.find({ post: req.params.id });

  res.status(200).json({
   status: 'success',
   data: {
    comment,
   },
  });
 } catch (err) {
  next(err);
 }
};

module.exports = { createComment, getComment, getAllComment };
