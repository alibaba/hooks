import { useMethods }  from '../index';

const count = 10;
const initialState = {
  count,
};

const createMethods = state => ({
  reset() {
    return initialState;
  },
  increment() {
    return { ...state, count: state.count + 1 };
  },
  decrement() {
    return { ...state, count: state.count - 1 };
  },
});

const [state, wrappedMethods]  =  useMethods( initialState, createMethods);

console.log(state.count) // 10
console.log( wrappedMethods.increment().count ) // 11
