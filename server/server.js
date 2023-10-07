require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URL);

app.listen(process.env.PORT || 3000, () => {
 console.log('Server is running on port 3000');
});

process.on('unhandledRejection', (err) => {
 process.exit(1);
});

process.on('uncaughtException', () => {
 process.exit(1);
});
