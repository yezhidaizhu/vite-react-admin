import { navigate } from "@/routers";
import { message } from "antd";

const TOKEN = "token";

// 请求拦截
export function requestOnFulfilled(config) {
  // 加入验证
  // const token = sessionStorage.getItem(TOKEN);
  // if (token) {
  //   config.headers.token = token;
  // }
  return config;
}

// 响应拦截
export function responseOnFulfilled({ data, headers }) {
  return new Promise((resolve, reject) => {
    if (headers.token) {
      sessionStorage.setItem(TOKEN, headers.token);
    }
    if (data instanceof Blob) {
      resolve(data);
    } else if (data?.code == 401) {
      navigate("/login");
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
  if (err?.code === "ECONNABORTED") {
    message.error("网络异常，请联系网络管理员检测");
  } else if (err?.code === "ERR_BAD_RESPONSE") {
    message.error("接口异常，请联系技术人员处理");
  } else if (err?.response?.status === 401) {
    navigate("/login")
  } else {
    // 更多处理
    message.error({ key: "respErr", content: err?.response?.data?.error });
  }
  return Promise.reject(err);
}