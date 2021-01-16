import axios from "axios";
import { toast } from "react-toastify";

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


//Handle undefined connection to the backend (spring boot server is down)
axios.interceptors.response.use(undefined, (error) => {
    if (error.message === "Network Error" && !error.response) {
        toast.error('Network error ☠️ - Make sure your API is running!');
    }
})



export const eventTypesUrls = {
    get: `${base_url}/eventTypes/`,
    create: `${base_url}/eventTypes/create`,
    details: (id) => `${base_url}/eventTypes/${id}`,
    delete: (id) => `${base_url}/eventTypes/${id}`,
    edit: (id) => `${base_url}/eventTypes/${id}`,
}

export const uploadImageUrl = `${base_url}/events/image`;

export const loginUrlUrl = `${base_url}/auth/login`;
export const createEventUrl = `${base_url}/events/create`;
export const getCurrentUserUrl = `${base_url}/auth/loggedInUser`;

