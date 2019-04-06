import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import  Home from './components/_pages/Home';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <Home />
        )} />
        <Route exact path='**' render={() => (
          <Home />
        )} />
      </Switch>
    );
  }
}

export default App;
