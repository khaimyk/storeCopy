import React, { useContext, useState } from "react"; // eslint-disable-next-line
import styles from "../styles/Auth.module.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
} from "../utils/consts";
import { useForm } from "react-hook-form";
import { login, signup } from "../http/userAPI.js";
import { observer } from "mobx-react-lite";
import { AppContext } from "../components/AppContext";

const Auth = observer(() => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;

      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await signup(email, password);
      }
      user.login(data);
      if (user.isAdmin) navigate(ADMIN_ROUTE);
      if (user.isAuth) navigate(USER_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = () => {
    reset();
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 aria-hidden="true">{isLogin ? "Авторизація" : "Реєстрація"}</h2>
          {!isLogin && (
            <div className={styles.control}>
              <label htmlFor="userName">Імʼя</label>
              <input
                {...register("userName", {
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
              />

              {errors.userName && (
                <p className={styles.error}>{errors.userName.message}</p>
              )}
            </div>
          )}
          <div className={styles.control}>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              {...register("Email", {
                required: "Обовʼязкове поле",
                pattern: {
                  value:
                    /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Введіть коректний email",
                },
              })}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errors.Email && (
              <p className={styles.error}>{errors.Email.message}</p>
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="Password">Пароль</label>
            <input
              type="password"
              {...register("Password", {
                required: "Обовʼязкове поле",
                minLength: {
                  value: 6,
                  message: "Мінімум 6 символів",
                },
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {errors.Password && (
              <p className={styles.error}>{errors.Password.message}</p>
            )}
          </div>

          <button
            onClick={click}
            type="submit"
            className={styles.button}
            disabled={!isValid}
          >
            {isLogin ? "Увійти" : "Реєстрація"}
          </button>
          {isLogin ? (
            <div className={styles.login}>
              Немає акаунта?{" "}
              <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь!</NavLink>
            </div>
          ) : (
            <div className={styles.login}>
              Вже є акаунт?
              <span>
                <NavLink to={LOGIN_ROUTE}>Увійдіть!</NavLink>
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
});

export default Auth;
