import React from "react";
import styles from "../styles/Product.module.scss";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => navigate(PRODUCT_ROUTE + "/" + data.id)}
    >
      <img
        className={styles.image}
        src={process.env.REACT_APP_API_URL + data.image}
        alt=""
      />
      <div className={styles.content}>
        <h4 className={styles.name}>{data.name} </h4>
        <p className={styles.price}>{data.price}</p>
        <button className={styles.button}>View Trips</button>
      </div>
    </div>
  );
};

export default ProductItem;
