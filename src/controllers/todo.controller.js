import { User } from '../models/user.model.js';
import { Todo } from '../models/todo.model.js';

export const createTodo = async (req, res) => {
    try {
        const { userId, title, description } = req.body;
        if (!userId || !title) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const todo = await Todo.create({
            title: title,
            description: description,
            status: false,
            user: user._id
        })
        user.todos.push(todo._id);
        await user.save();
        res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const { todoId, title, description } = req.body;
        const todo = await Todo.findById(todoId);
        if(!todo) {
            return res.status(404).json({ message: 'Todo does not exist '});
        }
        if(title !== undefined) todo.title = title;
        if(description !== undefined) todo.description = description;

        await todo.save();
        res.status(201).json({ message: 'Todo updated successfully', todo});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error '});
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.body.todoId;
        const userId = req.body.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const todo = await Todo.findById(todoId);
        if(!todo) {
            return res.status(404).json({ message: 'Todo does not exist '});
        }
        await Todo.findByIdAndDelete(todoId);
        user.todos.pull(todoId);
        await user.save();
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error '});
    }
}

export const changeTodoStatus = async (req, res) => {
    try {
        const todoId = req.body.todoId;
        const status = req.body.status;

        const todo = await Todo.findById(todoId);
        if(!todo) {
            return res.status(404).json({ message: 'Todo does not exist '});
        } 
        todo.status = Boolean(status);
        await todo.save();

        res.json({ message: "Todo status updated", todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error '});
    }
}