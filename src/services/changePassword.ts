import axios from '../utils/request'

const changePassword = async (body: object) => {

    const res = axios.post(
        '/password/admin',
        body
    );
    return res
}
export default changePassword