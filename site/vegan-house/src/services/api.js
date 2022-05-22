import axios from "axios";

const api = axios.create({
    //baseURL: 'http://localhost:8080/'
    // baseURL: 'http://174.129.13.249:8080/'
    baseURL: 'http://34.205.210.155:8080/'
});

export default api;