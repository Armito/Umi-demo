import { Reducer, useReducer } from 'react';

export const useCount = () => {
  interface CountState {
    count: number;
  }

  interface CountAction {
    type: 'add' | 'minuse' | 'reset';
    payload?: Partial<CountState>;
  }

  const reducer: Reducer<CountState, CountAction> = (state, action) => {
    switch (action.type) {
      case 'add':
        return { ...state, count: state.count + (action.payload?.count || 0) };

      case 'minuse':
        return { ...state, count: state.count - (action.payload?.count || 0) };

      case 'reset':
        return { ...state, count: action.payload?.count || 0 };

      default:
        return state;
    }
  };

  const initailState: CountState = {
    count: 0,
  };

  const [state, dispatch] = useReducer(reducer, initailState);

  return {
    state,
    dispatch,
  };
};
