import axios from '../../utils/request'
export type checkProfileInfo = {
    account_id: number,
    accept:boolean
}
const checkProfile = async (data: checkProfileInfo) => {
    const res = axios.post(
        '/admin/profile/check',
        data
    );
    return res
}
export default checkProfile