import axios from '../../utils/request'

const deleteUser = async (body:object) => {
    console.log(body);
    
    const res = axios.delete(
        '/admin/user',
        body
    );
    return res
}
export default deleteUser