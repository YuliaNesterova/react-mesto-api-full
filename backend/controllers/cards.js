const Card = require('../models/card');
const BadRequestErr = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenErr = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr('Введены невалидные данные');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {

  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      res.status(200).send(card);
    })

  // Card.findById(req.params.cardId)
  //   .then((card) => {
  //     if (!card) {
  //       throw new NotFoundError('Нет карточки с таким id');
  //     } else if (card.owner.toString() !== req.user._id) {
  //       throw new ForbiddenErr('Нет прав, нельзя удалять карточки других пользователей');
  //     }
  //
  //     Card.findByIdAndDelete(req.params.cardId)
  //       .then((deletedCard) => res.status(200).send(deletedCard));
  //   })
  //   .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Введен невалидный id карточки');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Введен невалидный id карточки');
      }
    })
    .catch(next);
};
