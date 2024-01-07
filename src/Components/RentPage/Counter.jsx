import React, { useState } from "react";

function Counter({ id, onChange }) {
  const [count, setCount] = useState(0);

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      onChange({ id, value: count -1 });
    }
  };

  const increment = () => {
    setCount(count + 1);
    onChange({ id, value: count + 1 });
  };
  return (
    <div className="counter-div">
        <button className="counter-btn" onClick={decrement}>-</button>
        <p className="count">{count}</p>
        <button className="counter-btn" onClick={increment}>+</button>
    </div>
  );
}

export default Counter;
