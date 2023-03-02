const express = require('express');

const router = express.Router();

const { getAllUsers, getUser, createUser, updateAvatar } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me/avatar', updateAvatar);

module.exports = {
  userRouter: router,
};
