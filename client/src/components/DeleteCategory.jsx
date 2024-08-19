import React, { useEffect } from "react";
import styles from "../styles/DeleteModal.module.scss";
import { deleteCategory } from "../http/catalogAPI";

const Modal = (props) => {
  const { isVisible = false, onClose, id, setChange } = props;
  const handleDeleteClick = (id) => {
    deleteCategory(id)
      .then((data) => {
        onClose();
        setChange((state) => !state);
        alert(`Категория «${data.name}» удалена`);
      })
      .catch((error) => alert(error.response.data.message));
  };

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
          <h3>Ви точно хочете видалити?</h3>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>
        <div className={styles.body}>
          <button onClick={() => handleDeleteClick(id)}>Так</button>
          <button onClick={() => onClose()}>Ні</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
