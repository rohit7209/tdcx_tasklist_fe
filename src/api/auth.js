/* eslint-disable class-methods-use-this */
import API, { getDefaultHeaders } from './api';

export default class AuthAPI extends API {
  constructor() {
    super({ auth: false });
  }

  async login(data) {
    const headers = getDefaultHeaders();
    const res = await this.post('/login', data, { headers });
    return res;
  }
}
