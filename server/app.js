const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const postRoute = require('./routes/postRoutes');
const commentRoute = require('./routes/commentRoutes');
const userRoute = require('./routes/userRoutes');
const globalErrorHandler = require('./controller/errorController');

const app = express();

// MIDDLEWARES
// CROSS-ORIGIN
// Define a whitelist of allowed origins
const whitelist = [
 'http://localhost:5173',
 'https://novelnotion.onrender.com/',
];

const corsOptions = {
 origin: (origin, callback) => {
  if (whitelist.indexOf(origin) !== -1 || !origin) {
   callback(null, true);
  } else {
   callback(new Error('Not allowed by CORS'));
  }
 },
 credentials: true,
};
app.use(cors(corsOptions));

// COOKIE-PARSER
app.use(cookieParser());

// Set securityHTTP headers
app.use(
 helmet({
  crossOriginResourcePolicy: false,
 })
);

// BODY-PARSER
app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Data sanitization against NOSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Data sanitization against parameter pollution
app.use(
 hpp({
  whitelist: ['name', 'email', 'title', 'content', 'category', 'comment'],
 })
);

// ROUTES
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/comments', commentRoute);

// ROUTE ERRORS
app.use('*', (req, res, next) => {
 next(`Cannot find this url ${req.originalUrl} on this server!`);
});

// OTHERS ERRORS
app.use(globalErrorHandler);

module.exports = app;
