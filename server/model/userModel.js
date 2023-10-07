const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
 name: {
  type: String,
  trim: true,
  required: [true, 'Please tell us your name'],
 },

 email: {
  type: String,
  unique: true,
  required: true,
  lowercase: true,
  validate: {
   validator: (val) => {
    return validator.isEmail(val);
   },
   message: 'Please provided generic email',
  },
 },

 photo: String,

 role: {
  type: String,
  enum: ['user', 'guide', 'admin'],
  default: 'user',
 },

 password: {
  type: String,
  trim: true,
  required: [true, 'A user must have password'],
  minlength: [8, 'A user password must be more than 8'],
  select: false,
 },
});

// HASH PASSWORD
userSchema.pre('save', async function (next) {
 if (!this.isModified('password')) return next();

 const hashedPassword = await bcrypt.hash(this.password, 11);

 this.password = hashedPassword;

 next();
});

// COMPARE PASSWORD
userSchema.methods.correctPassword = async (bodyPassword, userPassword) => {
 return await bcrypt.compare(bodyPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
