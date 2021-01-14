import axios from "axios";

const base_url = "http://localhost:8080";



/* axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config
}, error => {
    return Promise.reject(error);
}) */

//Add authorization header to requests
axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('userToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    return Promise.reject(error);
})



export const eventTypesUrls = {
    get: `${base_url}/eventTypes/`,
    create: `${base_url}/eventTypes/create`,
}


export const loginUrlUrl = `${base_url}/auth/login`;
export const createEventUrl = `${base_url}/events/create`;
export const getCurrentUserUrl = `${base_url}/auth/loggedInUser`;