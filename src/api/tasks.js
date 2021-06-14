import API from './api';
import { apiConstants } from './constants';

export default class CashbackAPI extends API {
  constructor(token) {
    super({ token });
  }

  async getTasks() {
    const res = await this.get(apiConstants.TASKS);
    return res;
  }

  async createTask(data) {
    const res = await this.post(apiConstants.TASKS, data);
    return res;
  }

  async updateTask(id, data) {
    const res = await this.put(`${apiConstants.TASKS}/${id}`, data);
    return res;
  }

  async deleteTask(id) {
    const res = await this.delete(`${apiConstants.TASKS}/${id}`);
    return res;
  }
}
