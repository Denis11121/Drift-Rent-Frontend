import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8081/user',
});

export const loginUser = (email, password) => 
    API.post('/login', { email, password });

export const registerUser = async (email, password, firstName, lastName, phoneNumber) => {
  const response = await fetch('http://localhost:8081/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      phoneNumber
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};
