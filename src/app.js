import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import middlewares from './middlewares';
require('dotenv').config();

import routes from './routes/tasksRoute'

// Initialize the Express app.
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.Promise = global.Promise;
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Force HTTPS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
      if (req.headers.host === 'your-app.herokuapp.com')
          return res.redirect(301, 'https://api.arktos.online');
      if (req.headers['x-forwarded-proto'] !== 'https')
          return res.redirect('https://' + req.headers.host + req.url);
      else
          return next();
  } else
      return next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the Arktos API'
  });
});

routes(app);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
