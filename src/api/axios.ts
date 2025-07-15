import axios from "axios";

 const axiosInstance =axios.create({
   
    baseURL: import.meta.env.VITE_BASEURL || "https://blog-it-backend-env3.onrender.com/",
    withCredentials:true
   
    
 })
 
 
 

 export default axiosInstance