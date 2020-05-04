import axios, { create } from 'axios';

export const baseURL = "http://localhost:8181"

const headers = {
    'Content-Type': 'application/json',
    'Authentication': localStorage.getItem("token")
}

const headersSemToken = {
    'Content-Type': 'application/json'
}

export const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem("token"),
        'Content-Type': 'application/json'
    }
  }); 


