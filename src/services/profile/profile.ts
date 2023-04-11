import axios from '../../utils/request'
interface IProfileInfo {
    id: string,
    car:{
        status:number,
        driver:{
            id:number,
            avatar_url:string
        }
    },
    position:{
        latitude:number,
        longitude:number
    },
    trip_id:string,
    power:number,
    plate_num:string
}
interface ProfileData {
    carData: IProfileInfo[]
}
export const getSomeProfileInfo = async () => {
    const data = await axios.get(
        `/admin/profile/some`,
    );
    return data;
}

export const getAllProfileInfo = async () => {
    const data = await axios.get(
        `/admin/profile/all`,
    );
    return data;
}
export const getPendingProfileInfo = async () => {
    const data = await axios.get(
        `/admin/profile/pending`,
    );
    return data;
}