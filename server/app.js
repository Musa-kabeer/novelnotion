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
const corsOptions = {
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     origin: '*',
     optionSuccessStatus: 200,
     headers: ['Content-Type', 'Authorization', 'x-access-token'],
     credentials: true,
     maxAge: 3600,
     //  preflightContinue: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// COOKIE-PARSER
app.use(cookieParser());

// BODY-PARSER
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Data sanitization against NOSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Data sanitization against parameter pollution
app.use(
     hpp({
          whitelist: [
               'name',
               'email',
               'title',
               'content',
               'category',
               'comment',
          ],
     })
);

// app.use('*', (req, res, next) => {
//      console.log(req);
// });

// FOR HOME ROUTE
app.get('/', (req, res, next) => {
     res.send('Hello World, from novelnotionapi! 😇.');
});

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
