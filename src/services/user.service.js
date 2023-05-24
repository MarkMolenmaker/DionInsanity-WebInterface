import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL + '/user';

class UserService {
  getAllUsers() {
    return axios.get(API_URL + '/', { headers: authHeader() }).then(
        response => {
            return response.data;
        }
    );
  }

  registerTwitchAccount(account) {
    return axios.post(API_URL + '/', account, { headers: authHeader() }).then(
        response => {
            return response.data;
        }
    );
  }

  deleteUser(id) {
    return axios.delete(API_URL + '/' + id, { headers: authHeader() }).then(
        response => {
            return response.data;
        }
    );
  }
}

export default new UserService();
