import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const createTodo = async ( userId, title, description) => {
    const response = await api.post('/api/todo/create', { userId, title, description });
    return response.data;
}

export const updateTodo = async (todoId, title, description) => {
    const response = await api.patch('/api/todo/update', { todoId, title, description });
    return response.data;
}

export const deleteTodo = async (todoId, userId) => {
    const response = await api.delete('/api/todo/delete', { data: { todoId, userId } });
    return response.data;
}

export const changeStatus = async (todoId, status) => {
    const response = await api.patch('/api/todo/status', { todoId, status });
    return response.data;
}

export const getTodos = async (userId) => {
    const response = await api.get(`/api/user/todos/${userId}`);
    return response.data;
}

