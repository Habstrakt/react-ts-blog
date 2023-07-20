import React from "react";
import styles from "./CounterPage.module.css";
import classNames from "classnames";
import { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  function incrementCount() {
    setCount((count) => count + 1);
  }

  function decrementCount() {
    if (count === 0) {
      return;
    } else {
      setCount((count) => count - 1);
    }
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <>
      <div className="col-lg-9">
        <div className={classNames(styles.card, "card")}>
          <div className="card-body">
            <h5 className="card-title text-center">Counter</h5>
            <div className="d-flex justify-content-evenly">
              <button
                className={classNames("btn btn-success", styles.btnCounter)}
                onClick={decrementCount}
              >
                -
              </button>
              <span className={styles.count}>{count}</span>
              <button
                className={classNames("btn btn-success", styles.btnCounter)}
                onClick={incrementCount}
              >
                +
              </button>
            </div>
            <button
              onClick={resetCount}
              className={classNames("btn btn-danger d-block", styles.btnReset)}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
