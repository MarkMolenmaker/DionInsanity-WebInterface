import authHeader from "@/services/auth-header";
import axios from "axios";


const API_URL = process.env.VUE_APP_API_URL + '/cluebingo';

class BingoService {
    generateGeneralBingoCard(items) {
        return axios.post(API_URL + '/general', {
            items: items
        }, {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    getGeneralBingoCard() {
        return axios.get(API_URL + '/general', {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    increaseItemAmount(bingoCard, item) {
        return axios.put(API_URL + '/loot', {
            bingoCardId: bingoCard.id,
            item: item,
            owner: bingoCard.owner,
            action: 'increase',
            amount: 1
        }, {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    decreaseItemAmount(bingoCard, item) {
        return axios.put(API_URL + '/loot', {
            bingoCardId: bingoCard.id,
            item: item,
            owner: bingoCard.owner,
            action: 'decrease',
            amount: 1
        }, {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    getAllItems() {
        return axios.get(API_URL + '/items', {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }
}

export default new BingoService();