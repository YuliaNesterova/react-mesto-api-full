const express = require('express');
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/error');
const { login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');
const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', errorRouter);

app.listen(PORT, () => {});
