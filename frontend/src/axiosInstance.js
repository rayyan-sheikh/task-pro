import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.25:8000/', // Replace with your API URL
  
});


export default axiosInstance;
