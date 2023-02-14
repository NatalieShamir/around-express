const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf-8' })
    .then((users) => {
      res.send(JSON.parse(users));
    })
    .catch(() => res.status(500).send({ message: 'We have encountered an error' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(dataPath, { encoding: 'utf-8' })
    .then((users) => {
      const data = JSON.parse(users);
      const user = data.find((user) => user._id === id.trim());//eslint-disable-line

      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User ID not found' });
      }
    })
    .catch(() => res.status(500).send({ message: 'We have encountered an error' }));
});

module.exports = {
  userRouter: router,
};
