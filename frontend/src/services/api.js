import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:7860/api", //base URL
    withCredentials: true, // using cookies for auth
})

export default api;