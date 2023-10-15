require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URL);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
     process.exit(1);
});

process.on('uncaughtException', () => {
     process.exit(1);
});
