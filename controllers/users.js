const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error(`No user found with ID of ${req.params.id}`);
      throw error;
    })
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Invalid ID format');
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, about } = req.body;

  User.create({ name, avatar, about })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;

        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
};

const updateUserData = (req, res) => {
  const body = req.body;

  User.findByIdAndUpdate(id, body, { new: true })
    .orFail(() => {
      const error = new Error(`No user found with ID of ${req.user._id}`);
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Invalid ID format');
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  const id = req.user._id

  if (!name || !about) {
    return res.status(400).send({ message: 'Please fill-in name and about fields' })
  }

  updateUserData(req, res);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const id = req.user._id

  if (!avatar) {
    return res.status(400).send({ message: 'Please fill-in avatar field' })
  }

  updateUserData(req, res);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateAvatar,
  updateProfile
};
