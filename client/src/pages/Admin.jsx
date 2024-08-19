import React, { useContext } from "react";
import styles from "../styles/Admin.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../http/userAPI";
import {
  ADMIN_CATEGORY_ROUTE,
  ADMIN_ORDERS_ROUTE,
  ADMIN_PRODUCT_ROUTE,
  LOGIN_ROUTE,
} from "../utils/consts";
import { AppContext } from "../components/AppContext";
const Admin = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    logout();
    user.logout();
    navigate(LOGIN_ROUTE, { replace: true });
  };

  return (
    <div className={styles.container}>
      <h1>Панель управління</h1>
      <p>Це панель управління магазином для адміністратора</p>
      <ul>
        <li>
          <Link to={ADMIN_ORDERS_ROUTE}>Закази в магазині</Link>
        </li>
        <li>
          <Link to={ADMIN_CATEGORY_ROUTE}>Категорія каталога</Link>
        </li>
        <li>
          <Link to={ADMIN_PRODUCT_ROUTE}>Товари каталога</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Вийти</button>
    </div>
  );
};

export default Admin;
