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
        ).catch(error => {
            return error;
        });
    }

    increaseItemAmount(owner, item) {
        return axios.put(API_URL + '/loot', {
            item: item,
            owner: owner,
            action: 'increase',
            amount: 1
        }, {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    decreaseItemAmount(owner, item) {
        return axios.put(API_URL + '/loot', {
            item: item,
            owner: owner,
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

    addBingoCard(id) {
        return axios.post(API_URL + '/' + id + '/add', {},
            {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    deleteBingoCard(bingoCardId) {
        return axios.delete(API_URL + '/' + bingoCardId + '/delete', {headers: authHeader()}).then(
            response => {
                return response.data;
            })
            .catch(error => {
                return error;
            });
    }

    getAllBingoCards() {
        return axios.get(API_URL + '/', {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    getAllLootCollections() {
        return axios.get(API_URL + '/loot', {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }

    getAllGeneralBingoCardVariations() {
        return axios.get(API_URL + '/general/all', {headers: authHeader()}).then(
            response => {
                return response.data;
            }
        );
    }
}

export default new BingoService();