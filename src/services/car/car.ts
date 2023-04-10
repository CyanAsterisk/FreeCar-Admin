import axios from '../../utils/request'
interface ICarInfo {
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
interface carData {
    carData: ICarInfo[]
}
export const getSomeCarInfo = async () => {
    const data = await axios.get(
        `/admin/car/some`,
    );
    return data;
}

export const getAllCarInfo = async () => {
    const data = await axios.get(
        `/admin/car/all`,
    );
    return data;
}