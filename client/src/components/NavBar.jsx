import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.scss";

import {
  ABOUT_US_ROUTE,
  CATALOG_ROUTE,
  CONTACTS_ROUTE,
  COOPERATION_ROUTE,
  CORPORATE_ORDERS_ROUTE,
  DELIVERY_ROUTE,
} from "../utils/consts";

const NavBar = ({ setIsVisible }) => {
  return (
    <div className={styles.menuBar}>
      <nav
        onClick={() => {
          setIsVisible(false);
        }}
        className={styles.listBar}
      >
        <NavLink className={styles.itemBar} to={CATALOG_ROUTE}>
          Каталог
        </NavLink>
        <NavLink className={styles.itemBar} to={ABOUT_US_ROUTE}>
          Про нас
        </NavLink>
        <NavLink className={styles.itemBar} to={COOPERATION_ROUTE}>
          Співпраця
        </NavLink>
        <NavLink className={styles.itemBar} to={CORPORATE_ORDERS_ROUTE}>
          Корпоративні замовлення
        </NavLink>
        <NavLink className={styles.itemBar} to={DELIVERY_ROUTE}>
          Оплата і доставка
        </NavLink>
        <NavLink className={styles.itemBar} to={CONTACTS_ROUTE}>
          Контакти
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
