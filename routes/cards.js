const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf-8' })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(500).send({ message: 'We have encountered an error' }));
});

module.exports = {
  cardRouter: router,
};
