
/**
 * 判断是否为开发环境
 */
export const isDev = import.meta.env.DEV;

export function sleep(timeout = 3000) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

/**
 * 随机id
 * @param {*} num 位数 默认6位
 * @returns 
 */
export function uuid(num = 6) {

  return Math.random().toString(16).slice(-num)
}


/**
 * 在对象中剔除空的属性
 * 只处理第一层
 * @param {*} obj
 * @param {*} emptyArr 默认剔除以下 ["",undefine,null,NaN]
 * @returns 返回新对象
 */
export function pickEmpty(obj = {}, emptyArr = ["", undefined, null, NaN]) {
  const ret = {};
  if (!obj || typeof obj !== "object") {
    console.error("[pickEmpty] obj参数需要一个对象");
    return {};
  }

  if (!Array.isArray(emptyArr)) {
    console.error("[emptyArr] obj参数需要一个数组");
    return {};
  }

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!emptyArr.includes(value)) {
        Object.assign(ret, { [key]: value });
      }
    }
  }

  return ret;
}