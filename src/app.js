import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';


require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB Connection
// const monk = require('monk')
// // Connection URL
// const url = 'localhost:27017/arktos-api';
// const db = require('monk')(url);
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
