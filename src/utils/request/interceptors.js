import { message } from "antd";

const TOKEN = "token";

export function requestOnFulfilled() {
  const token = sessionStorage.getItem(TOKEN);
  if (token) {
    config.headers.token = token;
  }
  return config;
};


export function responseOnFulfilled({ data, headers }) {
  return new Promise((resolve, reject) => {
    if (headers.token) {
      sessionStorage.setItem(TOKEN, headers.token);
    }
    if (data instanceof Blob) {
      resolve(data);
    } else if (data?.code === 401) {
      location.href = location.origin + '/login';
      reject(data);
    } else if (data?.success || data?.code === 200) {
      resolve(data?.body ?? data?.data);
    } else {

      message.error(data?.msg || "未知错误，请联系技术人员");
      console.error(`errorMsg=${data?.errorMsg}, message=${data?.msg}`);
      reject(data);
    }
  })
}


export function responseOnRejected(err) {
  console.error(err);
  if (err?.code === "ECONNABORTED") {
    message.error("网络异常，请联系网络管理员检测");
  } else if (err?.code === "ERR_BAD_RESPONSE") {
    message.error("接口异常，请联系技术人员处理");
  }
  return Promise.reject(err);
}