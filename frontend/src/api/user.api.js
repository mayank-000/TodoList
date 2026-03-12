import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const createUser = async ( username, email ) => {
    const response = await api.post('/api/users/sign-up', { username, email });
    return response;
}

export const loginUser = async ( email ) => {
    const response = await api.post('/api/users/sign-in', { email });
    return response;
}

export const getProfile = async (userId) => {
    const response = await api.get(`/api/users/getProfile${userId}`);
    return response;
}
