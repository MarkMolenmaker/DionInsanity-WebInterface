import axios from "axios";
import authHeader from "@/services/auth-header";

const API_URL = process.env.VUE_APP_API_URL + '/twitch';

class TwitchService {

    searchTwitchAccount(login) {
        return axios.get(API_URL + '/search?login=' + login, {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

}

export default new TwitchService();