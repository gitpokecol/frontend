import axios from "axios";
import { checkAndSetToken, handleTokenError } from "./interceptor";

const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(checkAndSetToken);
axiosInstance.interceptors.response.use((res) => res, handleTokenError);

export default axiosInstance;
