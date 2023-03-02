const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.use((req, res, next) => {
  req.user = {
    _id: '63ff36be8d3ba41c9b7ff7c1',
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);//eslint-disable-line
});
