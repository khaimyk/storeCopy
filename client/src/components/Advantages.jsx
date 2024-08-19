import React from "react";
import styles from "../styles/Advantages.module.scss";

const Advantages = () => {
  return (
    <section>
      <ul className={styles.list}>
        <li>
          <h3 className={styles.title}>Free Delivery</h3>
          <p className={styles.text}>
            Worldwide delivery on all. Authorit tively morph next-generation
            innov tion with extensive models.
          </p>
        </li>
        <li>
          <h3 className={styles.title}>Sales & discounts</h3>
          <p className={styles.text}>
            Worldwide delivery on all. Authorit tively morph next-generation
            innov tion with extensive models.
          </p>
        </li>
        <li>
          <h3 className={styles.title}>Quality assurance</h3>
          <p className={styles.text}>
            Worldwide delivery on all. Authorit tively morph next-generation
            innov tion with extensive models.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Advantages;
