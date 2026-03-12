import axios from 'axios';

const BaseURL = import.meta.env.VITE_API_URL;
console.log("API URL:", BaseURL);

const api = axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const createUser = async ( username, email ) => {
    const response = await api.post('/api/user/signup', { username, email });
    return response;
}

export const loginUser = async ( email ) => {
    const response = await api.post('/api/user/signin', { email });
    return response;
}

export const getProfile = async (userId) => {
    const response = await api.get(`/api/user/getprofile/${userId}`);
    return response;
}
