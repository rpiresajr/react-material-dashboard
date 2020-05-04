import axios, { create } from 'axios';

export const baseURL = "http://localhost:8181"

//const token = localStorage.getItem("token");
const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZWxpbnRvQGdtYWlsLmNvbSIsImlhdCI6MTU4ODYxMTEyMSwiaXNzIjoiUk9MRV9VU1VBUklPIiwiZXhwIjoxNTg5NDc1MTIxfQ.8WAF4JmmGJLwfqPmrPAe5XAc74wdAaYf8wVlClI1WYuW_SVDVUQGN6UzAgRhT04pZ8wwRJIBLcp-ZP80tnB6oA';

const headers = {
    'Content-Type': 'application/json',
    'Authentication': localStorage.getItem("token")
}

const headersSemToken = {
    'Content-Type': 'application/json'
}

axios.defaults.headers.common['Content-Type']  = 'application/json';
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.baseURL = baseURL;

axios.defaults.timeout = 15000;

export const axiosInstance = axios;
/*
export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 15000,
    headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  }); 

*/