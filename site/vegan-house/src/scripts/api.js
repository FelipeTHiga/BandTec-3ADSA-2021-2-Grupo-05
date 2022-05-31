import axios from "axios";

const api = axios.create({
    baseURL: 'https://veganhouseback.ddns.net/'
});

export default api;