import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

import styles from "../styles/PageProduct.module.scss";
const Rating = ({ rates, setRates }) => {
  const [hoverStar, setHoverStar] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const currentRates = i + 1;
        return (
          <label className={styles.rates} key={i}>
            <input
              type="radio"
              name="rating"
              value={currentRates || ""}
              onClick={() => setRates(currentRates)}
            />
            <FaStar
              className={styles.icon}
              color={
                currentRates <= (hoverStar || rates) ? "#ffc107" : "#e4e5e9"
              }
              onMouseEnter={() => setHoverStar(currentRates)}
              onMouseLeave={() => setHoverStar(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
