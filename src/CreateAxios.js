import axios from "axios";
export const CreateAxios = axios.create({
    baseURL: "https://task-manager-production-dd36.up.railway.app/api/",
    headers: {
        "ngrok-skip-browser-warning": true,
    }
})
export const createAxiosWithToken = (token) => axios.create({
    baseURL: "https://task-manager-production-dd36.up.railway.app/api/",
    headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: 'Bearer ' + token,
    }
})