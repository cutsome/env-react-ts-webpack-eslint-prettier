import React, { FC, useState } from 'react';

const Test: FC = () => {
  const [count, setCount] = useState(0);

  const countUp = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => countUp()}>
        Count Up
      </button>
    </div>
  );
};

export default Test;
