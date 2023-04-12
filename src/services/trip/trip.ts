import axios from '../../utils/request'

export const getSomeTripInfo = async () => {
    const data = await axios.get(
        `/admin/trip/some`,
    );
    return data;
}

export const getAllTripInfo = async () => {
    const data = await axios.get(
        `/admin/trip/all`,
    );
    return data;
}