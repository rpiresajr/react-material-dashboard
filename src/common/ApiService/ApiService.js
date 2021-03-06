import axios, { create } from 'axios';
import LocalStorageService from "../LocalStorageService";

//export const baseURL = "http://132.145.208.127:8181"
//export const baseURL = "http://127.0.0.1:8181"

export const baseURL = process.env.REACT_APP_API_BASEURL


const localStorageService = LocalStorageService.getService();



axios.interceptors.request.use(
    
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['X-Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;
        }
        //config.headers['Content-Type'] = 'application/json';
        //config.headers['Accept'] = 'application/json';
        //config.headers['Access-Control-Request-Headers'] = null;
        //config.headers['Access-Control-Request-Method'] = null;
        //config.headers['Access-Control-Max-Age'] = 1400; 
        
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




const axios2 = axios.create()

axios2.interceptors.request.use(
    
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['X-Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;
        }
        //config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        //config.headers['Content-Transfer-Encoding'] = 'binary';
        config.headers['Content-Type'] = 'multipart/form-data';
        config.headers['Accept'] = 'application/json';
        //config.headers['mode'] = 'no-cors';
        
        return config;
    },
    error => {
        Promise.reject(error)
    }
);
axios2.defaults.baseURL = baseURL;
axios2.defaults.timeout = 15000;


const axios3 = axios.create()

axios3.interceptors.request.use(
    
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['X-Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;
        }
        config.headers['Content-Type'] = 'application/pdf';
        //config.headers['Content-Transfer-Encoding'] = 'binary';
        config.headers['Accept'] = 'application/pdf';
        config.headers['responseType'] = 'blob';
        
        return config;
    },
    error => {
        Promise.reject(error)
    }
);
axios3.defaults.baseURL = baseURL;
axios3.defaults.timeout = 15000;


export const axiosInstance = axios;  
export const axiosInstanceImage = axios2;
export const axiosInstancePDF = axios3;


