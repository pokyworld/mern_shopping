import React, { Component } from 'react';
import { Provider } from 'react-redux';

import storeConfig from './store/index';

import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = storeConfig();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <ShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;
