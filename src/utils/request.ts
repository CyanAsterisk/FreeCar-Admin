import { ContentType } from './../pages/user/constants';
/**
 * @axios基础配置
 */

import Axios from 'axios'
//https://lanlance.cn:9528
//https://freecar.lanlance.cn
//https://10.20.192.105:8080
const axios = Axios.create({
    baseURL: 'http://43.138.9.224:9991',
    headers: {
        ContentType: 'application/x-www-form-urlencoded'
    },
    timeout: 5000,
});
axios.defaults.headers.get['Accept'] = 'application/x-www-form-urlencoded'

//*发送请求之前的准备
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {

        // config.headers.Token = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(
    (res) => {
        const data = res.data;
    },
    (err) => {
        return Promise.reject(err)
    })
/*axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
}); */

export default axios