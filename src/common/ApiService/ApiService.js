import { create } from 'axios';

const baseURL = "http://localhost:8181"

const headers = {
    'Content-Type': 'application/json',
    'Authentication': localStorage.getItem("token")
}

const headersSemToken = {
    'Content-Type': 'application/json'
}

export default baseURL;