import express from 'express';
const app = express();
app.use(express.json())
import { connectDB } from './config/db.js';

connectDB();

import todoRouter from './routes/todo.route.js';
import userRouter from './routes/user.route.js';

app.use('/api/todo', todoRouter);
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

