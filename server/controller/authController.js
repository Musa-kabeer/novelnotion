const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

// CREATE NEW TOKEN
const signToken = (res, statusCode, user) => {
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: '2d',
     });

     user.password = undefined;

     res.status(statusCode).json({
          status: 'success',
          token,
          data: {
               user,
          },
     });
};

// SIGN UP
const signup = async (req, res, next) => {
     try {
          const user = await User.create(req.body);

          signToken(res, 201, user);
     } catch (err) {
          next(err);
     }
};

// LOGIN ROUTE
const login = async (req, res, next) => {
     try {
          // CHECK REQUEST BODY
          if (!req.body.email || !req.body.password) {
               return next({
                    type: 'login',
                    status: 'fail',
                    message: 'Please provide email or password',
               });
          }

          // CHECK IF USER EXIST
          const user = await User.findOne({ email: req.body.email }).select(
               '+password'
          );

          // CHECK IF PASSWORD IS CORRECT
          if (
               !user ||
               !(await user.correctPassword(req.body.password, user.password))
          ) {
               return next({
                    type: 'login',
                    status: 'fail',
                    message: 'Email or Password is incorrect',
               });
          }

          signToken(res, 200, user);
     } catch (err) {
          next(err);
     }
};

// PROTECTED ROUTES
const protect = async (req, res, next) => {
     if (!req.headers.authorization.startsWith('Bearer')) {
          return next('Please provide authorization header');
     }

     const token = req.headers.authorization.split(' ').at(-1);

     //  CHECK IF THERE IS TOKEN
     if (!token) return next('You are not authenticated');

     //  VERIFY USER TOKEN
     let decoded;
     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, token) => {
          if (err) {
               return next(err);
          }

          decoded = token;
     });

     //  FIND USER IN OUR DB
     const user = await User.findById(decoded?.id);

     //  IF THERE IS NO USER
     if (!user) return next('No such user exist');

     req.user = user;

     next();
};

// RESTRICTED ROUTES
const restrictTo =
     (...roles) =>
     (req, res, next) => {
          if (!roles.includes(req.user.role))
               return next('You do not have permission to perform this action');

          next();
     };

module.exports = { login, signup, protect, restrictTo };
