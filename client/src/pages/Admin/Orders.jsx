import { useState, useEffect } from "react";
import { adminGetAll as getAllOrders } from "../../http/orderAPI.js";
import Orders from "../../components/Orders.jsx";
import CreateOrder from "../../components/CreateOrder.jsx";
import styles from "../../styles/Admin.module.scss";

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <p>Loading..,</p>;
  }

  return (
    <div className={styles.orders}>
      <h1>Всі замовлення</h1>
      <button onClick={() => setModal(true)}>Створити замовлення</button>
      <CreateOrder isVisible={isModal} onClose={() => setModal(false)} />
      <Orders items={orders} admin={true} />
    </div>
  );
};

export default AdminOrders;
