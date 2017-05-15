import React, { Component } from 'react';
import { observer } from 'mobx-react';

 class Data extends Component{ 
 render=()=>{
      return (
        <div>
          <ul>
            {this.props.counterStore.data.map(x => {
              return <li key={x.iso}>{x.name}</li>;
            })}
          </ul>
          <button
            onClick={this.props.getRemoteData}
            disabled={this.props.counterStore.UX$isLoading}
          >
            ¿Re intentar?
          </button>
        </div>
      );
    };
 }
export default observer(Data);
