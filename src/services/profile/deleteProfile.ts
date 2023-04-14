import axios from '../../utils/request'

const deleteProfile = async (body:object) => {
    
    const res = axios.delete(
        '/admin/profile',
        body
    );
    return res
}
export default deleteProfile