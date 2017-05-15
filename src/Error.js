import React, { Component } from 'react';
import { observer } from 'mobx-react';

class Error extends Component {

  render() {
    return (
      <div>
        <p>{this.props.counterStore.errorMessage}</p>
        <button
          onClick={this.props.getRemoteData}
          disabled={this.props.counterStore.UX$isLoading}
        >
          ¿Re intentar?
        </button>
      </div>
    );
  }
}

export default observer(Error);
