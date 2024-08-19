import BasketList from "../components/BasketList.jsx";
import styles from "../styles/Basket.module.scss";

const Basket = () => {
  return (
    <div>
      <h1 className={styles.header}>Корзина</h1>
      <BasketList />
    </div>
  );
};

export default Basket;
