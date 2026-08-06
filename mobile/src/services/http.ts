import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://192.168.15.134:3000',
  timeout: 10000,
});