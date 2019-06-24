import React from 'react';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Auth />
        <Home />
      </div>
    );
  }
}

export default App;
