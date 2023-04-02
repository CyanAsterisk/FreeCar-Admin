import axios from '../utils/request'
const login = (body) => {
    const { usename, password } = body;
    const data = axios({
        method: 'POST',
        url: '/login/admin',

    })
    return data;
}
export default login