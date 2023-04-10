import axios from '../../utils/request'
export type addCarInfo = {
    plate_num:number
}
const addUser = async (data: addCarInfo) => {
    const res = axios.post(
        '/admin/car',
        data
    );
    return res
}
export default addUser