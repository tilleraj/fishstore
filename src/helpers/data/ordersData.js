import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMyOrders = uid => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const orders = [];
      Object.keys(response.data).forEach((fbKey) => {
        response.data[fbKey].id = fbKey;
        orders.push(response.data[fbKey]);
      });
      resolve(orders);
    })
    .catch(error => reject(error));
});

const deleteOrder = orderId => axios.delete(`${baseUrl}/orders/${orderId}.json`);

export default { getMyOrders, deleteOrder };
