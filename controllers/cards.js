const Card = require('../models/card')

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'An error has occured on the server' }));
};

const createCard = (req, res) => {
  const { name, link, likes } = req.body

  const owner = req.user._id

  Card.create({ name, link, owner, likes })
    .then(card => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = `${Object.values(err.errors).map((error) => error.message).join(', ')}`;

        res.status(400).send({ message });
      } else {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
}

const deleteCard = (req, res) => {
  const { cardId } = req.params

  Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error("No card found with that ID")
      error.status = 404

      throw error
    })
    .then((card) => res.status(200).send({ message: 'The card has been successfully deleted', data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Invalid card ID format');
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
}

const updateLikes = (req, res, operator) => {
  const cardId = req.params.cardId
  const userId = req.user._id

  Card.findByIdAndUpdate(
    cardId,
    { [operator]: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("No card found with that ID")
      error.status = 404

      throw error
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Invalid card ID format');
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.status === 500) {
        res.status(500).send({ message: 'An error has occured on the server' });
      }
    });
}

const likeCard = (req, res) => updateLikes(req, res, '$addToSet')

const dislikeCard = (req, res) => updateLikes(req, res, '$pull')

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};
