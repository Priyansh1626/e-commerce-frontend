import axios from "axios";

const instance = axios.create({
    baseURL: "https://my-store-2002.up.railway.app"
    // baseURL: "http://localhost:8000"
})

export default instance;