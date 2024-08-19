import { useContext, useState } from "react";
import { AppContext } from "./AppContext.js";
import { increment, decrement, remove } from "../http/basketAPI.js";

import { useNavigate } from "react-router-dom";
import BasketItem from "./BasketItem.jsx";
import { observer } from "mobx-react-lite";
import { CHECKOUT_ROUTE } from "../utils/consts";
import styles from "../styles/Basket.module.scss";

const BasketList = observer(() => {
  const { basket } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);

  const navigate = useNavigate();

  const handleIncrement = (id) => {
    setFetching(true);
    increment(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleDecrement = (id) => {
    setFetching(true);
    decrement(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleRemove = (id) => {
    setFetching(true);
    remove(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  if (fetching) {
    return <p>Loading..,</p>;
  }

  return (
    <>
      {basket.count ? (
        <div className={styles.basket}>
          <div className={styles.cart}>
            {basket.products.map((item) => (
              <BasketItem
                key={item.id}
                increment={handleIncrement}
                decrement={handleDecrement}
                remove={handleRemove}
                {...item}
              />
            ))}
          </div>
          <div className={styles.order}>
            <p>
              Підсумок: <span className={styles.sum}>${basket.sum}</span>грн.
            </p>
            <button onClick={() => navigate(CHECKOUT_ROUTE)}>
              Оформить заказ
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.shoppingCart}>Ваша корзина пуста</p>
      )}
    </>
  );
});

export default BasketList;
