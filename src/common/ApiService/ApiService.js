import axios, { create } from 'axios';
import LocalStorageService from "../LocalStorageService";

//export const baseURL = "http://132.145.208.127:8181"
export const baseURL = "http://127.0.0.1:8181"


const localStorageService = LocalStorageService.getService();



axios.interceptors.request.use(
    
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['X-Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
        //config.headers['Access-Control-Request-Headers'] = null;
        //config.headers['Access-Control-Request-Method'] = null;
        config.headers['Access-Control-Max-Age'] = 1400; 
        
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

