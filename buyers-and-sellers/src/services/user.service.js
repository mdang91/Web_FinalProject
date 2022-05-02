import axios from 'axios';

export const signUp = async (form) => {
    return axios.post('http://localhost:3001/signup', form);
}

export const login = async (form) => {
    return axios.post('http://localhost:3001/login', form);
}

export const fetchAllUsers = async () => {
    return axios.get('http://localhost:3001/admin/allUser');
}

export const fetchUserById = async (userId) => {
    return axios.get(`http://localhost:3001/admin/user/${userId}`);
}

export const updateUser = async (form) => {
    return axios.patch(`http://localhost:3001/admin/user/edit`, form);
}

export const deleteUser = async (userId) => {
    return axios.delete(`http://localhost:3001/admin/delete/${userId}`);
}

export const saveAuthToSessionStorage = (authData) => {
    if (!authData) {
        return;
    }

    sessionStorage.setItem('user', JSON.stringify(authData));
}

export const clearAuthInSessionStorage = () => {
    sessionStorage.removeItem('user');
}

export const getUserFromLocalStorage = () => {
    return sessionStorage.getItem('user');
}