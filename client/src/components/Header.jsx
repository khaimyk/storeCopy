import React, { useContext, useState } from "react";
import styles from "../styles/Header.module.scss";
import AVATAR from "../images/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { AppContext } from "./AppContext";
import NavBar from "./NavBar";
import useClickOutside from "../utils/useClickOutside";
import Search from "./Search";
import { logout } from "../http/userAPI.js";

const Header = observer(() => {
  const { user, basket } = useContext(AppContext);
  const navigate = useNavigate();
  const { ref, isVisible, setIsVisible } = useClickOutside(false);
  const [isModal, setModal] = useState(false);
  const handleLogout = (event) => {
    logout();
    user.logout();
    navigate("/login", { replace: true });
  };

  const handleCreateClick = () => {
    setModal(true);
  };

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <div className={styles.user}>
          <input name="toggle" type="checkbox" />
          <label className={styles.toggleContainer} htmlFor="toggle">
            <div className={styles.avat}>
              <div
                className={styles.avatar}
                style={{ backgroundImage: `url(${AVATAR})` }}
              />

              <span className={styles.triangl}>&#9660;</span>
            </div>

            {user.isAuth ? (
              <div>
                <button
                  className={styles.username}
                  onClick={() => navigate(ADMIN_ROUTE)}
                >
                  Admin
                </button>

                <button
                  className={styles.username}
                  onClick={() => handleLogout()}
                >
                  Exit
                </button>
              </div>
            ) : (
              <div>
                <button
                  className={styles.username}
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Guest
                </button>
              </div>
            )}
          </label>
        </div>

        <div ref={ref} className={styles.menu}>
          <button
            className={styles.menuButton}
            onClick={() => setIsVisible(!isVisible)}
          >
            <svg className={styles["icon-menu"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#menu`}></use>
            </svg>
          </button>
          {isVisible && <NavBar setIsVisible={setIsVisible} />}
        </div>
      </div>

      <div className={styles.account}>
        <button className={styles.search} onClick={() => handleCreateClick()}>
          <svg className={styles.icon}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#search`}></use>
          </svg>
        </button>
        <Search isVisible={isModal} onClose={() => setModal(false)} />

        <div className={styles.heart}>
          <Link to={SHOP_ROUTE} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use
                xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#heart`}
              ></use>
            </svg>
          </Link>
        </div>
        <div className={styles.bag}>
          <Link to={BASKET_ROUTE} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#bag`}></use>
            </svg>
            {!!basket.count && (
              <span className={styles.count}>{basket.count}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Header;
