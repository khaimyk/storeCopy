import { useState, useEffect } from "react";
import { adminGetOne as getOneOrder } from "../../http/orderAPI.js";
import Order from "../../components/Order.jsx";
import { useParams } from "react-router-dom";
import styles from "../../styles/Admin.module.scss";

const AdminOrder = () => {
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
    return <p>Loading..,</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.order}>
      <h1>Замовлення № {order.id}</h1>
      <Order data={order} admin={true} />
    </div>
  );
};

export default AdminOrder;
