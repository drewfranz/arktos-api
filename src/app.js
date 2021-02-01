const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
      if (req.headers.host === 'your-app.herokuapp.com')
          return res.redirect(301, 'https://arktos.online');
      if (req.headers['x-forwarded-proto'] !== 'https')
          return res.redirect('https://' + req.headers.host + req.url);
      else
          return next();
  } else
      return next();
});


// MongoDB Connection
// const monk = require('monk')
// // Connection URL
// const uri = process.env.MONGODB_URI;
// const db = monk(uri);
// const collection = db.get('document');

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the Arktos API'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
