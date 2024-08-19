import { useState, useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext.js";
import { userCreate, guestCreate } from "../http/orderAPI.js";
import { fetchBasket } from "../http/basketAPI.js";
import { check as checkAuth } from "../http/userAPI.js";
import { Navigate } from "react-router-dom";
import { BASKET_ROUTE, SHOP_ROUTE } from "../utils/consts.js";
import { useForm } from "react-hook-form";
import styles from "../styles/Checkout.module.scss";

const Checkout = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [valid, setValid] = useState({
    name: null,
    email: null,
    phone: null,
    address: null,
  });
  const { user, basket } = useContext(AppContext);
  const [fetching, setFetching] = useState(true); // loader, пока получаем корзину

  const [order, setOrder] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = () => {
    const body = { ...value };
    const create = user.isAuth ? userCreate : guestCreate;
    create(body).then((data) => {
      setOrder(data);
      basket.products = [];
    });
    reset();
  };

  useEffect(
    () => {
      // если корзина пуста, здесь делать нечего
      fetchBasket()
        .then((data) => (basket.products = data.products))
        .finally(() => setFetching(false));
      // нужно знать, авторизован ли пользователь
      checkAuth()
        .then((data) => {
          if (data) {
            user.login(data);
          }
        })
        .catch((error) => user.logout());
    },
    // eslint-disable-next-line
    []
  );

  if (fetching) {
    // loader, пока получаем корзину
    return <p>Loading..,</p>;
  }

  if (order) {
    // заказ был успешно оформлен
    return (
      <div className={styles.order}>
        <h1>Замовлення оформлене</h1>
        <p>Наш менеджер невдовзі зателефонує для уточнення деталей.</p>
        <button onClick={() => (window.location.href = BASKET_ROUTE)}>
          <button onClick={() => (window.location.href = SHOP_ROUTE)}></button>
          Назад
        </button>
      </div>
    );
  }

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    /*
     * Вообще говоря, проверять данные поля, пока пользователь не закончил ввод — неправильно,
     * проверять надо в момент потери фокуса. Но приходится проверять здесь, поскольку браузеры
     * автоматически заполняют поля. И отловить это событие — весьма проблематичная задача.
     */
    setValid({ ...valid });
  };
  return (
    <div className={styles.container}>
      {basket.count === 0 && <Navigate to={BASKET_ROUTE} replace={true} />}
      <h1>Оформлення замовлення</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          імʼя і прізвище
          <input
            {...register("name", {
              required: "Обовʼязкове поле",

              minLength: {
                value: 2,
                message: "Мінімум 2 символа",
              },
              maxLength: {
                value: 25,
                message: "Максимум 25 символів",
              },
              pattern: {
                value: /^[А-Я-A-Z][A-Za-zА-Яа-я\s]*$/,
                message: "Введіть символ верхнього регістру",
              },
            })}
            value={value.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </label>
        <label htmlFor="email">
          {" "}
          адреса електронної пошти
          <input
            type="email"
            {...register("email", {
              required: "Обовʼязкове поле",
              pattern: {
                value:
                  /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Введіть коректний email",
              },
            })}
            value={value.email}
            onChange={(e) => handleChange(e)}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </label>
        <label htmlFor="phone">
          {" "}
          номер телефона
          <input
            type="number"
            {...register("phone", {
              required: "Обовʼязкове поле",
              pattern: {
                value: /^[0-9]{12}$/,
                message: "Введіть коректний номер телефона",
              },
            })}
            value={value.phone}
            onChange={(e) => handleChange(e)}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </label>
        <label htmlFor="address">
          {" "}
          адресу доставки
          <input
            {...register("address", {
              required: "Обовʼязкове поле",
            })}
            value={value.address}
            onChange={(e) => handleChange(e)}
          />
          {errors.address && (
            <p className={styles.error}>{errors.address.message}</p>
          )}
        </label>
        <label htmlFor="comment">
          {" "}
          Примітка до замовлення
          <input {...register("comment")} />
        </label>
        <label>
          <button type="submit" disabled={!isValid}>
            Отправить
          </button>
        </label>
      </form>
    </div>
  );
};

export default Checkout;
