import axios from "axios";

const api = axios.create({
    baseURL: 'http://veganhouseback.ddns.net'
});

export default api;