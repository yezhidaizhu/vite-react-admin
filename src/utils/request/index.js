import axios from "axios";
import { stringify } from "qs";
import { responseOnFulfilled, responseOnRejected } from "./interceptors";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 30000,
  paramsSerializer: {
    serialize: function (params) {
      return stringify(params, { arrayFormat: "repeat", allowDots: true });
    },
  },
});

instance.interceptors.request.use(responseOnFulfilled);
instance.interceptors.response.use(responseOnFulfilled, responseOnRejected);


export default function api() {
  // instance.get
  // config 传递
}
