#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './app';

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
