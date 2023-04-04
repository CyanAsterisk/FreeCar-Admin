/**
 * @axios基础配置
 */

import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://freecar.lanlance.cn',
    timeout: 5000,
});
/* axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bear ${token}`;
    }
    return config;
}) */

/* axios.interceptors.response.use(
    (res) => {
        const data = res.data;
        
        
        
    },
    (err) => {

    }) */
axios.interceptors.request.use(function (config) {
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
});

export default axios