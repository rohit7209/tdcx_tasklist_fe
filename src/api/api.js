/* eslint-disable class-methods-use-this */
import { get } from 'lodash';
import { apiConstants } from './constants';

export const getDefaultHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
};

export default class API {
  constructor(args) {
    const auth = get(args, 'auth') || true;
    const headers = get(args, 'headers') || null;
    const token = get(args, 'token') || null;

    this.baseURL = apiConstants.BASE_URL;
    if (headers) {
      this.headers = headers;
    } else {
      this.headers = getDefaultHeaders();
      if (auth) {
        this.headers.append('authorization', `Bearer ${token}`);
      }
    }
  }

  async call(url, options) {
    try {
      let response = await fetch(url, options);
      if (response.status === 401) {
        throw new Error('Authorization information is missing or invalid.');
      } else if (response.status === 404) {
        throw new Error(`URL/Method not found (${url})`);
      } else if (response.status !== 200) {
        throw new Error(`Server error: ${response.status}`);
      }
      response = await response.json();
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async post(url, body, options = {}) {
    const response = await this.call(`${this.baseURL}${url}`, {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(body),
      ...options,
    });

    return response;
  }

  async get(url) {
    const response = await this.call(`${this.baseURL}${url}`, {
      method: 'get',
      headers: this.headers,
    });
    return response;
  }

  async put(url, body) {
    const response = await this.call(`${this.baseURL}${url}`, {
      method: 'put',
      headers: this.headers,
      body: JSON.stringify(body),
    });
    return response;
  }

  async delete(url) {
    const response = await this.call(`${this.baseURL}${url}`, {
      method: 'delete',
      headers: this.headers,
    });
    return response;
  }
}
