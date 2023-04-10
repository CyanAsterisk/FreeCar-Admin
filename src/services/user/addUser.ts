import axios from '../../utils/request'
export type addUserInfo = {
    account_id: number,
    username: string,
    phone_number: number,
    avatar_blob_id: number,
    open_id: string
}
const addUser = async (data: addUserInfo) => {
    const res = axios.post(
        '/admin/user',
        data
    );
    return res
}
export default addUser