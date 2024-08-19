import { useEffect } from "react";
import styles from "../styles/Admin.module.scss";

const CreateOrder = ({ isVisible = false, onClose }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });
  return !isVisible ? null : (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          Новый заказ
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={styles.body}>
          <p className={styles.content}>Форма для создания заказа</p>
        </div>

        <div>
          <button>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
