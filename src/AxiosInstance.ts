import axios from 'axios';

const BASE_URL = 'https://parcial-cvds3-c2bzfehfg4dmbdhk.canadacentral-01.azurewebsites.net';

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});