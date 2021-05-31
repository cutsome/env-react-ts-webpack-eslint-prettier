import React, { VFC } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCount, countUp } from '../slices/counterSlice';

const Test: VFC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => dispatch(countUp())}>
        Count Up
      </button>
    </div>
  );
};

export default Test;
