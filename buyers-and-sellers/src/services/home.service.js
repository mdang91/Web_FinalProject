import axios from 'axios';

export const getHomeListByUsername = async (username) => {
    return axios.get(`http://localhost:3001/home/getAllByUser?username=${username}`);
}

export const registerHome = async (form) => {
    return axios.post(`http://localhost:3001/home/register`, form);
}

export const updateHome = async (form) => {
    return axios.patch(`http://localhost:3001/home/update`, form);
}

export const deleteHome = async (homeId) => {
    return axios.delete(`http://localhost:3001/home/delete/${homeId}`)
}

export const getHomeById = async (homeId) => {
    return axios.get(`http://localhost:3001/home/detail/${homeId}`)
}

export const addToWishList = async (username, homeId) => {
    const requestPayload = {
        username: username,
        homeId: homeId
    }
    return axios.post(`http://localhost:3001/home/wishlist`, requestPayload);
}

export const getBuyerWishList = async (username) => {
    return axios.get(`http://localhost:3001/home/wishlist/${username}`);
}

export const removeHomeFromWishlist = async (username, homeId) => {
    return axios.delete(`http://localhost:3001/home/remove-wishlist/${username}/${homeId}`);
}
