/**
 * @axios基础配置
 */

import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://freecar.lanlance.cn',
    timeout: 5000,
    withCredentials: false
});
axios.defaults.withCredentials = false
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bear ${token}`;
    }
    return config;
})

axios.interceptors.response.use(
    (res) => {

    },
    (err) => {

    })

export default axios