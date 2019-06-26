// on the left
import React from 'react';
import fishData from '../../helpers/data/fishData';

import './Inventory.scss';

class Inventory extends React.Component {
  state = {
    fishes: [],
  }

  componentDidMount() {
    fishData.getFishes()
      .then(fishes => this.setState({ fishes }))
      .catch(error => console.error('could not get fishes', error));
  }

  render() {
    return (
      <div className="Inventory">
        <h2>Inventory</h2>
      </div>
    );
  }
}

export default Inventory;
