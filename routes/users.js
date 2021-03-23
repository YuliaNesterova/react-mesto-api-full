const router = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar
} = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

router.get('/users', getUsers);
router.get('/users/me', getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(/^(http|https):\/\/(www\.)?[\w-._~:/?#[\]@!$&'()*+,;=%]+#?$/i)),
  })
}), updateAvatar);

module.exports = router;
