import axios from 'axios'

const USER_BASE_REST_API_URL='http://localhost:9999/userservice/user'

const USER_GET_EMAIL_REST_API_URL='http://localhost:9999/userservice/user'

const USER_POST_REST_API_URL='http://localhost:9091/user/add'

const USER_PUT_REST_API_URL='http://localhost:9091/user/edit'

const USER_Delete_REST_API_URL='http://localhost:9091/user/delete'

const USER_WASHPACK_REST_API_URL ='http://localhost:9091/user/addPack'

const USER_FROM_ADMIN_REST_API_URL='http://localhost:8888/admin/user'

const GET_USER_FROM_WASHPACK_REST_API_URL='http://localhost:9091/user/getWashPacks'

class UserService{
    getUserFromAdmin(userId){
        return axios.get(USER_FROM_ADMIN_REST_API_URL+"/"+userId);
    }
    getAllUsers(){
        return axios.get(USER_BASE_REST_API_URL)
    }

    getUserByEmail(userEmail){
        return axios.get(USER_GET_EMAIL_REST_API_URL+"/"+userEmail);
    }
    createUser(users){
        return axios.post(USER_POST_REST_API_URL,users)
    }
    getUserById(userId){
        return axios.get(USER_BASE_REST_API_URL+"/"+userId);
    }
    updateUser(userId,users){
        return axios.put(USER_PUT_REST_API_URL+"/"+userId,users);
        
    }

    updateWashPackIdinUser(userId,users){
        return axios.put(USER_WASHPACK_REST_API_URL+"/"+userId,users)
    }
    getUserFromWashPackId(washPackId){
        return axios.get(GET_USER_FROM_WASHPACK_REST_API_URL+"/"+washPackId)
    }


    deleteUser(userId){
        return axios.delete(USER_Delete_REST_API_URL+"/"+userId);
    }


}

export default new UserService();