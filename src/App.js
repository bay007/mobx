import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CounterStore from './CounterStore'; //importamos el Store hecha clase
import FetchData from './FetchData';
import { observer } from 'mobx-react'; //The observer function / decorator can be used to turn ReactJS components into reactive components.
import DevTools from 'mobx-react-devtools'; //para debugging

class App extends Component {
  constructor() {
    super();
    this.counterStore = new CounterStore(); //declaramos una instancia del store
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to React</h1>

        </div>
        <div className="App-intro">

          <FetchData counterStore={this.counterStore} />
          <DevTools />

        </div>
      </div>
    );
  }
}

export default observer(App); //Se declara como Observador ya que se requiere que Muten algunas partes del componente
