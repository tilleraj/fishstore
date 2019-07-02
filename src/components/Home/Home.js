import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import Inventory from '../Inventory/Inventory';
import NewOrder from '../NewOrder/NewOrder';
import Orders from '../Orders/Orders';

import fishData from '../../helpers/data/fishData';
import ordersData from '../../helpers/data/ordersData';

import './Home.scss';

class Home extends React.Component {
  state = {
    orders: [],
    fishes: [],
    fishOrder: {},
  }

  getOrders = () => {
    ordersData.getMyOrders(firebase.auth().currentUser.uid)
      .then(orders => this.setState({ orders }))
      .catch(error => console.error('could not get orders', error));
  }

  componentDidMount() {
    fishData.getFishes()
      .then(fishes => this.setState({ fishes }))
      .catch(error => console.error('could not get fishes', error));

    this.getOrders();
  }

  deleteOrder = (orderId) => {
    ordersData.deleteOrder(orderId)
      .then(() => this.getOrders())
      .catch(error => console.error('did not delete order', error));
  }

  addFishToOrder = (fishId) => {
    const fishOrderCopy = { ...this.state.fishOrder };
    fishOrderCopy[fishId] = fishOrderCopy[fishId] + 1 || 1;
    this.setState({ fishOrder: fishOrderCopy });
  }

  render() {
    const { fishes, orders, fishOrder } = this.state;
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col">
              <Inventory fishes={fishes} addFishToOrder={this.addFishToOrder} />
            </div>
            <div className="col">
              <NewOrder
                fishes={fishes}
                fishOrder={fishOrder}
              />
            </div>
            <div className="col">
              <Orders orders={orders} deleteOrder={this.deleteOrder} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
