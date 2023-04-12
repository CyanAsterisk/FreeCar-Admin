import axios from '../../utils/request'

const deleteTrip = async (body:object) => {
    
    const res = axios.delete(
        '/admin/trip',
        body
    );
    return res
}
export default deleteTrip