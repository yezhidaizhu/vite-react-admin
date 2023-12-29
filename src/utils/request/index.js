import axios from "axios";
import { stringify } from "qs";
import { requestOnFulfilled, responseOnFulfilled, responseOnRejected } from "./interceptors";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 30000,
  paramsSerializer: {
    serialize: function (params) {
      return stringify(params, { arrayFormat: "repeat", allowDots: true });
    },
  },
});

instance.interceptors.request.use(requestOnFulfilled);
instance.interceptors.response.use(responseOnFulfilled, responseOnRejected);


const req = (url = "", method = "GET", config = {}) => {
  return instance(url, {
    method,
    ...config,
  })
}

export const api = {
  get: (url = "", data, config = {}) => req(url, "GET", { params: data, ...config }),
  post: (url = "", data, config = {}) => req(url, "POST", { data, ...config }),
  del: (url = "", data, config = {}) => req(url, "DELETE", { data, ...config }),
  put: (url = "", data, config = {}) => req(url, "PUT", { data, ...config }),
}

