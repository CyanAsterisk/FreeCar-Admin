import axios from '../../utils/request'
export type updateUserInfo = {
    account_id:number,
    username:string,
    phone_number:number,
}
const updateUser = async(data:updateUserInfo) => {
    const res = axios.put(
        '/admin/user',
        data
    );
    return res
}
export default updateUser