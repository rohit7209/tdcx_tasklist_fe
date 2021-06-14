
export default class Storage {
  constructor() {
    this.appKey = process.env.APP_KEY || 'dtcx_challenge_cg6125vbwqe';
    this.data = JSON.parse(localStorage.getItem(this.appKey) || '{}');
  }

  getItem = (key) => this.data[key]

  setItem = (key, value) => {
    this.data[key] = value;
    localStorage.setItem(this.appKey, JSON.stringify(this.data));
    return this.data[key];
  }

  removeItem = (key) => {
    delete this.data[key];
    localStorage.setItem(this.appKey, JSON.stringify(this.data));
    return this.data[key];
  }

  getAllItem = () => this.data;
}
