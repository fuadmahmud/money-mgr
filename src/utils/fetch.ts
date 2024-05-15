import axios from 'axios';

const http = axios.create({
  baseURL: "http://localhost:3000",
});


import type { AxiosRequestConfig } from 'axios';
export default function fetch(options: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    http(options)
      .then((res: { data: unknown; }) => {
        resolve(res.data);
      })
      .catch((err: { response: { data: any, status: number }; }) => {
        console.log(err);
        
        if (typeof err.response.data === 'undefined') {
          resolve(err);
        } else resolve(err.response.data);
      });
  });
}
