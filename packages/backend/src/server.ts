import bodyParser from 'body-parser';
import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import 'dotenv/config';

import AppRouter from './routes';
import connectDB from './config/database';
import errorHandler from './middlewares/error-handler.middleware';

const app = express();
const router = new AppRouter(app);
// Connect to DB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

app.use(errorHandler);
const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
