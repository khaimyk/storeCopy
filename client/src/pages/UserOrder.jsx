import { useState, useEffect } from "react";
import { userGetOne as getOneOrder } from "../http/orderAPI.js";
import Order from "../components/Order.jsx";
import { useParams } from "react-router-dom";
import styles from "../styles/Order.module.scss";

const UserOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOneOrder(id)
      .then((data) => setOrder(data))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <div animation="border" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.header}>
      <h1>Замовлення № {order.id}</h1>
      <Order data={order} admin={false} />
    </section>
  );
};

export default UserOrder;
