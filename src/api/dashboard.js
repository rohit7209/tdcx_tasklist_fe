/* eslint-disable class-methods-use-this */
import API from './api';
import { apiConstants } from './constants';

export default class DashboardAPI extends API {
  constructor(token) {
    super({ token });
  }

  async getDashboardInfo() {
    const res = await this.get(apiConstants.DASHBOARD);
    return res;
  }
}
