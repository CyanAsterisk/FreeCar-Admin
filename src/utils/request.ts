import { ContentType } from './../pages/user/constants';
/**
 * @axios基础配置
 */

import Axios from 'axios'
//https://lanlance.cn:9528
//https://freecar.lanlance.cn
//https://10.20.192.105:8080
const axios = Axios.create({
    baseURL: 'https://freecar.lanlance.cn',
    
    timeout: 5000,
});

//*发送请求之前的准备
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

//*接收到请求后的操作
axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        return Promise.reject(err)
    })

export default axios