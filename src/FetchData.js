import React, { Component } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import CounterStore from './CounterStore';
import Loading from './Loading';
import Error from './Error';
import Data from './Data';

class FetchData extends Component {
  state = {
    counterStore: new CounterStore(),
  };

  getRemoteData = () => {
    this.state.counterStore.setUX$loading(true);
    this.state.counterStore.setUX$isError(false);
    axios
      .get('http://www.mocky.io/v2/59190716120000981740dc46', {
        timeout: 600,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
      .then(response => {
        this.state.counterStore.setData(response.data);
      })
      .catch(error => {
        this.state.counterStore.setUX$isError(true);

        this.state.counterStore.setErrorMessage(
          `There has been a problem with your fetch operation: ${error.message}`
        );
      });
    this.state.counterStore.setUX$loading(false);
  };

  componentWillMount() {
    this.getRemoteData();
  }

  render() {
   

    return (
      <div>
        <hr />
        {this.state.counterStore.UX$loading
          ? <Loading />
          : <Data
              getRemoteData={this.getRemoteData}
              counterStore={this.state.counterStore}
            />}
        <hr />
        {this.state.counterStore.UX$loading
          ? <Loading />
          : <Data
              getRemoteData={this.getRemoteData}
              counterStore={this.state.counterStore}
            />}
        <hr />
        {this.state.counterStore.UX$isError
          ? <Error
            counterStore={this.state.counterStore}
              getRemoteData={this.getRemoteData}
              
            />
          : null}
        <hr />
      </div>
    );
  }
}

export default observer(FetchData);
