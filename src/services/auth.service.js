import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL + '/auth';

class AuthService {
  twitchLogin(code) {
    return axios
        .post(API_URL + '/twitch', {
          code: code
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }

          return response.data;
        });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
