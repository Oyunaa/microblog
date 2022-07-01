/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { AuthRoutes } from './app/routes/Auth';
import { PostRoutes } from './app/routes/Post';
import { connectToDatabase } from './database';

const app = express();

connectToDatabase()
  .then(() => console.log('DB success'))
  .catch((e) => console.log(e));

app.use(AuthRoutes);
app.use('post', PostRoutes);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
