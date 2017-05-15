import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CounterStore from './CounterStore';
import Loading from './Loading';
import Error from './Error';
import Data from './Data';

class FetchData extends Component {
  state = {
    counterStore: {},
  };

  componentWillMount() {
    this.setState({ counterStore: new CounterStore() }, () => {
      this.state.counterStore.getRemoteData();
    });
  }

  render() {
    return (
      <div>
        <hr />
        {this.state.counterStore.UX$isLoading
          ? null
          : <Data
              onLoading={<Loading/>}
              getRemoteData={this.state.counterStore.getRemoteData}
              isLoading={this.state.counterStore.UX$isLoading}
              data={this.state.counterStore.data}
            />}
        <hr />

        {this.state.counterStore.UX$isError
          ? <Error
              getRemoteData={this.state.counterStore.getRemoteData}
              counterStore={this.state.counterStore}
            />
          : null}
        <hr />
      </div>
    );
  }
}

export default observer(FetchData);
