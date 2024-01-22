import { request } from '@umijs/max';
import { isNil } from 'lodash';

const baseURL = '';

const api = {
  get: (url = '', params = {}, other = {}) => request(url, { method: 'GET', params, ...other }),
  post: (url = '', data = {}) => request(url, { method: 'POST', data }),
  put: (url = '', data = {}) => request(url, { method: 'PUT', data }),
};

export default api;

type CreateServiceType<T extends Record<string, any>> = {
  service?: string;
  modules?: string;
  others?: T;
};

type Service<T extends Record<string, any>> = {
  create: (data: any | undefined) => Promise<any>;
  page: (params: any | undefined) => Promise<any>;
  one: (id: any) => Promise<any>;
  modify: (data: any, id: any) => Promise<any>;
  del: (id: any) => Promise<any>;
} & T;

export function createService<T extends Record<string, any>>(
  params: CreateServiceType<T>,
): Service<T> {
  const { service = 'training', modules, others } = params;

  const result: Service<T> | any = {
    create: (data: any | undefined) =>
      request(`/api/${service}/${modules}`, { method: 'POST', data, baseURL }),

    page: (params: any | undefined) =>
      request(`/api/${service}/${modules}/page`, { method: 'GET', params, baseURL }),

    one: (id: number | string) =>
      request(`/api/${service}/${modules}/${id}`, { method: 'GET', baseURL }),

    modify: (data: any, id: number | string) =>
      request(`/api/${service}/${modules}/${id}`, { method: 'PUT', data, baseURL }),

    del: (id: number | string) =>
      request(`/api/${service}/${modules}/${id}`, { method: 'DELETE', baseURL }),
  };

  if (others && !isNil(others)) {
    Object.assign(result, others);
  }

  return result;
}
