import React from "react";
import styles from "../styles/Basket.module.scss";

const BasketItem = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={process.env.REACT_APP_API_URL + props.image} alt="" />
      </div>

      <div className={styles.content}>
        <h4>{props.name} </h4>
        <p className={styles.suma}>
          Ціна: <span className={styles.price}>${props.price}</span>
        </p>
        <div>
          Кількість:
          <button onClick={() => props.decrement(props.id)}>-</button>
          <strong className={styles.quantity}>{props.quantity}</strong>
          <button onClick={() => props.increment(props.id)}>+</button>
        </div>
        <p>
          Сума:{" "}
          <span className={styles.price}>${props.price * props.quantity}</span>
        </p>
      </div>
      <button onClick={() => props.remove(props.id)}>X</button>
    </div>
  );
};

export default BasketItem;
