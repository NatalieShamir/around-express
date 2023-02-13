const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
// const users = require("./data/users.json");
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
