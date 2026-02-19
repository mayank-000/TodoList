import axios from 'axios';

const BaseURL = import.meta.env.BASE_URL;

const api = axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const createTodo = async ( title, description) => {
    const response = await api.post('/api/todo/create', { title, description });
    return response.data;
}

export const updateTodo = async (todoId, title, description) => {
    const response = await api.patch('/api/todo/update', { todoId, title, description });
    return response.data;
}

export const deleteTodo = async (todoId) => {
    const response = await api.delete('/api/todo/delete', { todoId });
    return response.data;
}

export const changeStatus = async (todoId, status) => {
    const response = await api.post('/api/todo/status', { todoId, status });
    return response.data;
}