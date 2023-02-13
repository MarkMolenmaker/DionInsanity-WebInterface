import authHeader from "@/services/auth-header";
import axios from "axios";


const API_URL = process.env.VUE_APP_API_URL + '/cluebingo';

class BingoService {
    createMainBingoCard() {
        return axios.post(API_URL + '/main', {}, {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    getMainBingoCard() {
        return axios.get(API_URL + '/main', {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }
}

export default new BingoService();