import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
import { connectDB } from './config/db.js';
console.log("Trying to connecting to database:");
connectDB();
console.log("Mongodb connected sucessfully");
import todoRouter from './routes/todo.route.js';
import userRouter from './routes/user.route.js';

app.use('/api/todo', todoRouter);
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;

