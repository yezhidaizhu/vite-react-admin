
/**
 * 判断是否为开发环境
 */
export const isDev = import.meta.env.DEV;

export function sleep(timeout = 3000) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

/**
 * 随机id
 * @param {*} num 位数
 * @returns 
 */
export function uuid(num = 6) {

  return Math.random().toString(16).slice(-num)
}