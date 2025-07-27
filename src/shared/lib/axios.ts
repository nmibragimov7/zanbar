import axios from "axios";
import { i18n } from 'next-i18next';

// import {authService} from "@/entities/Auth/Auth.module";
import {accessTokenStorage, refreshTokenStorage, userStorage} from './lsStorage';

export const fetcher = axios.create({
  baseURL: "/api",
})
axios.interceptors.request.use(request => {
  return request;
});

fetcher.interceptors.request.use((config: any) => {
  if (accessTokenStorage.get() && !config.url.includes('refresh') && !config.url.includes('login')) {
    config.headers.Authorization = `Bearer ${accessTokenStorage.get()}`
    config.headers['Accept-Language'] = i18n?.language === 'ru' ? 'ru' : 'kk'
  }

  return config;
})
fetcher.interceptors.response.use((response: any) => response, (error: any) => {
  if (error?.response?.status === 401 && !error?.config?.url.includes('refresh') && !error?.config?.url.includes('login')) {
    accessTokenStorage.clear()
    refreshTokenStorage.clear()
    userStorage.clear()
    if (typeof window !== 'undefined') {
      // window.location.href = "/"
    }
  }
  return Promise.reject(error);
})
