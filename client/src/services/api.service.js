import axios from 'axios';
import store from '../store/index'
const token = store.getters.token;
export default () => {
  return axios.create({
    baseURL: "http://192.168.0.54:8081",
    headers: {
      common: {
        'Authorization': `Bearer ${token}`
      }
    }
  })
}

