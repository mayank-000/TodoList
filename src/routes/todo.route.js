import express from express;
import {
    createTodo,
    updateTodo,
    deleteTodo,
    changeTodoStatus
} from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/create', createTodo);
router.patch('/update', updateTodo);
router.delete('/delete', deleteTodo);
router.patch('/status', changeTodoStatus);

export default router;