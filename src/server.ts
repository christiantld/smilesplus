import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';
import uploadConfig from './config/upload';

const app = express();

app.use(express.json());
// list avatar files
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server started at port 3333 🚀');
});
