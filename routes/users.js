const express = require('express');

const router = express.Router();

const { getAllUsers, getUser, createUser } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = {
  userRouter: router,
};
