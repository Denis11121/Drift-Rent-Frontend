import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8081/user', // URL-ul backend-ului
});

export const loginUser = (email, password) => 
    API.post('/login', { email, password });

export const registerUser = (email, password) => 
    API.post('/create', { email, password });
