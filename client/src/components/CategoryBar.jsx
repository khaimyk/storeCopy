import React, { useContext } from "react";

import styles from "../styles/Shop.module.scss";
import Tilt from "react-parallax-tilt";
import { observer } from "mobx-react-lite";
import { AppContext } from "./AppContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CATALOG_ROUTE } from "../utils/consts";

const CategoryBar = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === catalog.category) {
      catalog.category = null;
    } else {
      catalog.category = id;
    }
    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: CATALOG_ROUTE + "/",
      search: "?" + createSearchParams(params),
    });
  };

  return (
    <div className={styles.menu}>
      {catalog.categories.map((item) => (
        <div
          key={item.id}
          active={item.id === catalog.category ? "true" : ""}
          onClick={() => handleClick(item.id)}
          className={styles.content}
        >
          <Tilt
            className={styles.track}
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.75}
            glarePosition="all"
            scale={1.07}
          >
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1579645899072-e14c6b840afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
              alt=""
            />
            <h2 className={styles.title}>{item.name}</h2>
          </Tilt>
        </div>
      ))}
    </div>
  );
});

export default CategoryBar;
