import { useState, useEffect } from "react";
import { userGetAll as getAllOrders } from "../http/orderAPI.js";
import Orders from "../components/Orders.jsx";
import styles from "../styles/Orders.module.scss";

const UserOrders = () => {
  const [orders, setOrders] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <p animation="border"></p>;
  }

  return (
    <div className={styles.header}>
      <h1>Ваші замовлення</h1>
      <Orders items={orders} admin={false} />
    </div>
  );
};

export default UserOrders;
