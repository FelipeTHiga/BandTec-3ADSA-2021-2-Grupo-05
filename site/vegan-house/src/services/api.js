import axios from "axios";

const api = axios.create({
    baseURL: 'https://veganhouseback.ddns.net/'
    //baseURL: 'http://174.129.13.249:8080/'
});

export default api;