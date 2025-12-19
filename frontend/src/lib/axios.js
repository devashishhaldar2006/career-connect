import axios from "axios"
import env

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,//by adding this field browser will send the cookies to the server automatically, on every single req
})

export default axiosInstance;