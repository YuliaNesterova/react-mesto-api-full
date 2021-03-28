const NotFoundError = require("../errors/not-found-err");
const router = require('express').Router();

router.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
