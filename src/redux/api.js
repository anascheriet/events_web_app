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
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - Make sure your API is running!')
    }

    const { status } = error.response;
    if (error.response.status === 404) {
        console.log("not found")
    }

    if (status === 500) {
        toast.error('Server error - check the terminal for more info');
    }
    toast.error(error.response.data.message);
    throw error.response;
})


export const eventTypesUrls = {
    get: `${base_url}/eventTypes/`,
    create: `${base_url}/eventTypes/create`,
    details: (id) => `${base_url}/eventTypes/${id}`,
    delete: (id) => `${base_url}/eventTypes/${id}`,
    edit: (id) => `${base_url}/eventTypes/${id}`,
}

export const eventsUrls = {
    create: `${base_url}/events/create`,
    details: (id) => `${base_url}/events/${id}`,
    edit: (id) => `${base_url}/events/${id}`,
    delete: (id) => `${base_url}/events/${id}`,
    getAll: `${base_url}/events/`
}

export const authUrls = {
    login: `${base_url}/auth/login`,
    forgotPassword: `${base_url}/auth/forgotPassword`,
    resetPassword: `${base_url}/auth/resetPassword`,
    register: `${base_url}/auth/register`,
    getCurrentUser: `${base_url}/auth/loggedInUser`,
    updateProfile: `${base_url}/auth/updateProfile`,
    updatePassword: `${base_url}/auth/updatePassword`
}

export const clientUrls = {
    book: `${base_url}/reservations/create`,
    clientBookings: `${base_url}/reservations/MyBookings`,
    cancelBooking: (id) => `${base_url}/reservations/CancelBooking/${id}`
}

export const statUrls = {
    income: `${base_url}/reservations/income`,
    byClientAge: `${base_url}/reservations/byClientAge`,
    byClientNationality: `${base_url}/reservations/byClientCountry`,
    byBookingMonth: `${base_url}/reservations/byBookingMonth`,
    byEventType: `${base_url}/reservations/byEventType`,
}

export const uploadImageUrl = `${base_url}/events/image`;

export const adminDataUrl = `${base_url}/auth/adminData`;

export const lockUnlockAdminUrl = (id) => `${base_url}/auth/lockUnlockAdminAccount/${id}`;





