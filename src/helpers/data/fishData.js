import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getFishes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/fishes.json`)
    .then((response) => {
      const fishes = [];
      Object.keys(response.data).forEach((fbKey) => {
        response.data[fbKey].id = fbKey;
        fishes.push(response.data[fbKey]);
      });
      resolve(fishes);
    })
    .catch(error => reject(error));
});

export default { getFishes };
