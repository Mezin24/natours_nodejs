const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

app.use(express.json());
app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
