import { extendObservable, action } from 'mobx';

class CounterStore {
  constructor() {
    extendObservable(this, {
      data: [],
      setData: action.bound(function(_data) {
        this.data = _data;
      }),

      UX$isLoading: true,
      setUX$loading: action.bound(function(_boolean) {
        this.UX$isLoading = _boolean;
      }),

      UX$isError: false,
      setUX$isError: action.bound(function(_boolean) {
        this.UX$isError = _boolean;
      }),

      errorMessage: '',
      setErrorMessage: action.bound(function(_errorMessage) {
        this.errorMessage = _errorMessage;
      }),
    });
  }
}

export default CounterStore;
