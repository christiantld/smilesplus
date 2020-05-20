import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from './routes';

import './database';
import uploadConfig from './config/upload';
import GlobalExceptionHandler from './middlewares/GlobalExceptionHandler';

const app = express();

app.use(express.json());
// list avatar files
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(GlobalExceptionHandler);

app.listen(3333, () => {
  console.log('🚀 Server started at port 3333 🚀');
});
