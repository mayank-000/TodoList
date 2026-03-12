import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
import { connectDB } from './config/db.js';

connectDB();

import todoRouter from './routes/todo.route.js';
import userRouter from './routes/user.route.js';

app.use('/api/todo', todoRouter);
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

