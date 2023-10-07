const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
 {
  comment: {
   type: String,
   required: [true, 'Comment is required'],
   trim: true,
  },

  user: {
   type: mongoose.Schema.ObjectId,
   ref: 'User',
   required: [true, 'A Comment must belong to a user.'],
  },

  post: {
   type: mongoose.Schema.ObjectId,
   ref: 'Post',
   required: [true, 'A Comment must belong to a post.'],
  },
 },
 {
  timestamps: true,
  strictQuery: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
 }
);

commentSchema.pre(/^find/, function (next) {
 this.populate({
  path: 'user',
  select: 'name photo',
 });

 next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
