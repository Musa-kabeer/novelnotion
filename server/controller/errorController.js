// DEVELOPMENT
const handleDevError = (err, res) => {
 return res.status(400).json({
  error: err,
  statusCode: 500,
  message: err.message,
  stack: err.stack,
 });
};

// VALIDATION-ERRORS
const handleValidationError = (err, res) => {
 const errors = Object.values(err.errors)
  .map((el) => el.message)
  .join(', ');

 const message = `Error: ${errors}`;

 res.status(403).json({
  status: 'fail',
  message: message,
 });
};

// FILE-UPLOAD-ERROR
const handleFileUploadError = (err, res) => {
 res.status(400).json({
  status: 'fail',
  message: err,
 });
};

// DUPLICATE-ERROR
const handleDuplicateError = (err, res) => {
 const message = err.message.split('"').at(-2);

 res.status(409).json({
  status: 'fail',
  message: `${message} has already exist in our database`,
 });
};

// USER LOGIN FAILED
const handleUserLogin = (err, res) => {
 res.status(400).json({
  status: err.status,
  message: err.message,
 });
};

const handleJWTError = (err, res) => {
 res.status(400).json({
  status: 'fail',
  message: 'Your token as expired. Please login again',
 });
};

const globalErrorHandler = (err, req, res, next) => {
 //  DEVELOPMENT
 if (process.env.NODE_ENV === 'development') return handleDevError(err, res);

 //  PRODUCTION
 if (process.env.NODE_ENV === 'production') {
  // Upload Error
  if (typeof err === 'string') return handleFileUploadError(err, res);

  //   Mongoose Validation
  if (err.name === 'ValidationError') return handleValidationError(err, res);

  //   DUPLICATE ERROR
  if (err.code === '11000') return handleDuplicateError(err, res);

  //   USER LOGIN ERROR
  if (err.type === 'login') return handleUserLogin(err, res);

  //   JWT EXPIRES
  if (err.name === 'TokenExpiredError') return handleJWTError(err, res);
 }
};

module.exports = globalErrorHandler;
