import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = () => axios.get(API_URL);
export const getUserById = (id) => axios.get(`${API_URL}/${id}`);
export const addUser = (user) => axios.post(API_URL, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
