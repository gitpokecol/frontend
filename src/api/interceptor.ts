import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "../constant/common";

export function checkAndSetToken(config: InternalAxiosRequestConfig) {
  if (!config.headers || config.headers.Authorization) return config;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }

  return config;
}

export function handleTokenError(error: AxiosError) {
  const { status } = error.response;

  console.log(error);

  if (status === 401) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = "/";
  } else {
    throw error;
  }
}
