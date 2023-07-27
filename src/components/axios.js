import axios from "axios";

const instance = axios.create({
    baseURL: "https://my-store-2002.up.railway.app"
})

export default instance;