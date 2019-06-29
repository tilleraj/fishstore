import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import ordersData from '../../helpers/data/ordersData';
import OrderRow from '../OrderRow/OrderRow';

import './Orders.scss';

class Orders extends React.Component {
  state = {
    orders: [],
  }

  componentDidMount() {
    ordersData.getMyOrders(firebase.auth().currentUser.uid)
      .then(orders => this.setState({ orders }))
      .catch(error => console.error('could not get orders', error));
  }

  render() {
    const orderComponents = this.state.orders.map(order => (
      <OrderRow key={order.id} order={order} />
    ));
    return (
      <div className="Orders">
        <h2>Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Name</th>
              <th scope="col">Date</th>
              <th scope="col"># Fish</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orderComponents}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orders;
