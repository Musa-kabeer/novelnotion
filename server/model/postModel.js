const mongoose = require('mongoose');
const slug = require('slug');

const postSchema = mongoose.Schema(
 {
  title: {
   type: String,
   required: [true, 'A post must have title'],
   trim: true,
  },

  category: {
   type: String,
   required: [true, 'A post must have category'],
   trim: true,
  },

  image: {
   type: String,
   required: [true, 'A post must have image'],
  },

  content: {
   type: String,
   required: [true, 'A post must have content'],
  },

  slug: String,

  user: {
   type: mongoose.Schema.ObjectId,
   ref: 'User',
   required: [true, 'Post must have a user.'],
  },
 },
 {
  timestamps: true,
  strictQuery: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
 }
);

// Virtual populate
postSchema.virtual('comments', {
 ref: 'Comment',
 foreignField: 'post',
 localField: '_id',
});

postSchema.pre('save', function (next) {
 this.slug = slug(this.title, { lower: true });

 next();
});

postSchema.pre('find', function (next) {
 this.find({}).select('image title category _id');

 next();
});

postSchema.pre('findOne', function (next) {
 this.populate('comments').populate('user');

 next();
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
