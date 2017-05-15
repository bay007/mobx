import React, { Component } from 'react';
import { observer } from 'mobx-react';

class Data extends Component {
  render() {
    return (
      <div>
        {!this.props.isLoading
          ? (<ul>
              {this.props.data.map(x => {
                return <li key={x.iso}>{x.name}</li>;
              })}
              <button onClick={this.props.getRemoteData}>
                ¿Re intentar?
              </button>
            </ul>)
          : this.props.onLoading}
      </div>
    );
  }
}
export default observer(Data);
