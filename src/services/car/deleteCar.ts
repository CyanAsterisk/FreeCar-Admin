import axios from '../../utils/request'

const deleteCar = async (body:object) => {
    
    const res = axios.delete(
        '/admin/car',
        body
    );
    return res
}
export default deleteCar