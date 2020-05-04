import axios, { create } from 'axios';
import LocalStorageService from "../LocalStorageService";

export const baseURL = "http://localhost:8181"


const localStorageService = LocalStorageService.getService();


const headers = {
    'Content-Type': 'application/json',
    'Authentication': `Bearer ${localStorageService.getAccessToken()}`
}

const headersSemToken = {
    'Content-Type': 'application/json'
}


axios.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['X-Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });

//axios.defaults.headers.common['Content-Type']  = 'application/json';
//axios.defaults.headers.common['X-Authorization'] = token;
//axios.defaults.headers.common['Accept-Encoding'] = 'identity';
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 15000;
export const axiosInstance = axios; 


/*
export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  }); 
*/

