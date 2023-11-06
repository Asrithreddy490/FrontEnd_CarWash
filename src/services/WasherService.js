import axios from "axios";

const WASHER_BASE_REST_API_URL ='http://localhost:9092/washer';
const WASHER_POST_REST_API_URL ='http://localhost:9092/washer/add'
const WASHER_PUT_REST_API_URL='http://localhost:9092/washer/edit'
const WASHER_DELETE_REST_API_URL ='http://localhost:9092/washer/delete'
const WASHPACK_BY_WASHER_REST_API_URL='http://localhost:9093/washpack/getByWasherId'
const USERS_BY_WASHER_REST_API_URL ='http://localhost:9091/user/getWashPacks'

class WasherService{
    getAllWashers(){
    return axios.get(WASHER_BASE_REST_API_URL)            
    }

    getWasherById(washerId){
        return axios.get(WASHER_BASE_REST_API_URL+"/"+washerId);
    }
    getWasherForWashPack(washerId){
        return axios.get(WASHPACK_BY_WASHER_REST_API_URL+"/"+washerId)
    }
    getWasherForUer(washerId){
        return axios.get(USERS_BY_WASHER_REST_API_URL+"/"+washerId)
    }

    addWasher(washers){
        return axios.post(WASHER_POST_REST_API_URL,washers)
    }

    updateWasher(washerId,washers){
        return axios.put(WASHER_PUT_REST_API_URL+"/"+washerId,washers)
    }

    deleteWasher(washerId){
        return axios.delete(WASHER_DELETE_REST_API_URL+"/"+washerId);
    }
}


export default new WasherService();
