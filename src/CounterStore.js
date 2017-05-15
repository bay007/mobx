import { extendObservable, action } from 'mobx';
import axios from 'axios';

class CounterStore {
  constructor() {
    extendObservable(this, {
      data: [],
      errorMessage: '',
      UX$isLoading: true,
      UX$isError: false,

      setData: action.bound(function(_data) {
        this.data = _data;
      }),

      getRemoteData: action.bound(function() {
        this.setUX$loading(true);
        this.setUX$isError(false);
        axios
          .get('http://www.mocky.io/v2/59190716120000981740dc46', {
            timeout: 600,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          })
          .then(DelayPromise(1500))
          .then(response => {
            this.setData(response.data);
          })
          .catch(error => {
            this.setUX$isError(true);

            this.setErrorMessage(
              `There has been a problem with your fetch operation: ${error.message}`
            );
          });
        this.setUX$loading(false);
      }),

      setUX$loading: action.bound(function(_boolean) {
        this.UX$isLoading = _boolean;
      }),

      setUX$isError: action.bound(function(_boolean) {
        this.UX$isError = _boolean;
      }),

      setErrorMessage: action.bound(function(_errorMessage) {
        this.errorMessage = _errorMessage;
      }),
    });
  }
}

export default CounterStore;

function DelayPromise(delay) {
  console.log("Pocesing...");
  //return a function that accepts a single variable
  return function(data) {
    //this function returns a promise.
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, 1000 + delay * Math.random());
    });
  };
}
