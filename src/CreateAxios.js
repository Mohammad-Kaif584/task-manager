import axios from "axios";
export const CreateAxios = axios.create({
    baseURL: "https://rhomboidally-preformationary-catherina.ngrok-free.dev/api/",
    headers: {
        "ngrok-skip-browser-warning": true,
    }
})
export const createAxiosWithToken = (token) => axios.create({
    baseURL: "https://rhomboidally-preformationary-catherina.ngrok-free.dev/api/",
    headers: {
        "ngrok-skip-browser-warning": true,
        Authorization: 'Bearer ' + token,
    }
})