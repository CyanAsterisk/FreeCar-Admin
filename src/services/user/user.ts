import axios from '../../utils/request'
interface IUserInfo {
    account_id: number,
    username: string,
    phone_number: number,
    avatar_blob_id: number,
    open_id: number
}
interface userData {
    userData: IUserInfo[]
}
export const getSomeUserInfo = async () => {
    const data = await axios.get(
        `/admin/user/some`,
    );
    return data;
}

export const getAllUserInfo = async () => {
    const data = await axios.get(
        `/admin/user/all`,
    );
    return data;
}