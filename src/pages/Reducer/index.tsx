import { useCount } from './hooks/useCount';

const ReducerPage = () => {
  const { state, dispatch } = useCount();

  const onAdd = () => {
    dispatch({
      type: 'add',
      payload: {
        count: 3,
      },
    });
  };

  const onMinuse = () => {
    dispatch({
      type: 'minuse',
      payload: {
        count: 2,
      },
    });
  };

  const onReset = () => {
    dispatch({
      type: 'reset',
    });
  };

  const onReset66 = () => {
    dispatch({
      type: 'reset',
      payload: {
        count: 66,
      },
    });
  };

  return (
    <div>
      <div>{state.count}</div>
      <button onClick={onAdd}>+3</button>
      <button onClick={onMinuse}>-2</button>
      <button onClick={onReset}>Reset</button>
      <button onClick={onReset66}>Reset 66</button>
    </div>
  );
};

export default ReducerPage;
