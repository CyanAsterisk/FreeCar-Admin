import axios from '../utils/request'
const login = (body) => {
    console.log(body);
    
    const { userName, password } = body;
    console.log(userName, password);
    const data = axios.post(
        '/login/admin',
        {
            username: userName,
            password: password
        }
    )
    console.log(data);
    
    return data;
}
export default login