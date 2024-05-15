import axios from 'axios';

const http = axios.create({
  baseURL: "https://simple-be-json-n3rgenos3-fuadmahmuds-projects.vercel.app",
});


import type { AxiosRequestConfig } from 'axios';
export default function fetch(options: AxiosRequestConfig) {
  return new Promise((resolve) => {
    http(options)
      .then((res: { data: unknown; }) => {
        resolve(res.data);
      })
      .catch((err: { response: { data: any, status: number }; }) => {
        if (typeof err.response.data === 'undefined') {
          resolve(err);
        } else resolve(err.response.data);
      });
  });
}
