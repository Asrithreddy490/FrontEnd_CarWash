import axios from 'axios'

const WASHPACK_GET_REST_API_URL ='http://localhost:9093/washpack';
const WASHPACK_POST_REST_API_URL ='http://localhost:9093/washpack/add';
const WASHPACK_PUT_REST_API_URL='http://localhost:9093/washpack/edit';
const WASHPACK_DELETE_REST_API_URL ='http://localhost:9093/washpack/delete';

const ADD_WASHER_TO_WASHPACK_REST_API_URL ='http://localhost:9093/washpack/addWasherId';

class WashPackService{
    getAllWashPacks(){
        return axios.get(WASHPACK_GET_REST_API_URL);
    }

    getWashPackId(washpackId){
        return axios.get(WASHPACK_GET_REST_API_URL+"/"+washpackId);
    }

    addWashPack(washpack){
        return axios.post(WASHPACK_POST_REST_API_URL,washpack);
    }

    updateWashPack(washpackId,washpack){
        return axios.put(WASHPACK_PUT_REST_API_URL+"/"+washpackId,washpack);
    }

    addWasherToWashpack(washpackId,washpack){
        return axios.put(ADD_WASHER_TO_WASHPACK_REST_API_URL+"/"+washpackId,washpack);
    }

    deleteWashPack(washpackId){
        return axios.delete(WASHPACK_DELETE_REST_API_URL+"/"+washpackId);
    }

}

export default new WashPackService();