import React from "react";
import styles from "../styles/Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.address}>
        <a class={styles.politic} href="#" target="_blank" rel="noreferrer">
          Політика конфедеційності
        </a>
        <p class={styles.copyright}>&copy; 2024 Дані захищені</p>
      </div>
      <div className={styles.socialContainer}>
        <div className={styles.socialMenu}>
          <FontAwesomeIcon icon={faShareNodes} />
        </div>

        <ul className={styles.social}>
          <li className={styles.brands}>
            <a
              className={styles.link}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li className={styles.brands}>
            <a
              className={styles.link}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
          <li className={styles.brands}>
            <a
              className={styles.link}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
