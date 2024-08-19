import {
  createCategory,
  fetchCategory,
  updateCategory,
} from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import styles from "../styles/Admin/Categories.module.scss";
import { useForm } from "react-hook-form";

const EditCategory = (props) => {
  const { id, isVisible = false, onClose, setChange } = props;

  const [name, setName] = useState("");
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCategory(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== "");
        })
        .catch((error) => alert(error.response.data.message));
    } else {
      setName("");
      setValid(null);
    }
  }, [id]);

  const handleChange = (event) => {
    setName(event.target.value);
    setValid(event.target.value.trim() !== "");
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
  const {
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const handleSubmit = (event) => {
    event.preventDefault();
    /*
     * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
     * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
     * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
     * «принял к сведению» наше сообщение, что состояние нужно изменить.
     */
    const correct = name.trim() !== "";
    setValid(correct);
    if (correct) {
      const data = {
        name: name.trim(),
      };
      const success = (data) => {
        // закрываем модальное окно создания-редактирования категории
        onClose();
        // изменяем состояние родителя, чтобы обновить список категорий
        setChange((state) => !state);
      };
      const error = (error) => alert(error.message);
      id
        ? updateCategory(id, data).then(success).catch(error)
        : createCategory(data).then(success).catch(error);
    }
  };
  return !isVisible ? null : (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {id ? "Редагування" : "Створення"} категорії
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            {...register("name", {
              required: "Обовʼязкове поле",

              minLength: {
                value: 2,
                message: "Мінімум 2 символа",
              },
              maxLength: {
                value: 35,
                message: "Максимум 35 символів",
              },
            })}
            value={name}
            aria-invalid={valid === false}
            onChange={(e) => handleChange(e)}
            placeholder="Назва категории..."
          />
          {errors.name && <p>{errors.name.message}</p>}

          <button type="submit" disabled={!isValid}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
