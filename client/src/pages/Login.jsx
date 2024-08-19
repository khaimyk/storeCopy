import { AppContext } from "../components/AppContext.js";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login } from "../http/userAPI.js";
import { observer } from "mobx-react-lite";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  USER_ROUTE,
} from "../utils/consts.js";
import styles from "../styles/Auth.module.css";
import { useForm } from "react-hook-form";

const Login = observer(() => {
  // если пользователь авторизован — ему здесь делать нечего
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // если пользователь авторизован — ему здесь делать нечего
  useEffect(() => {
    if (user.isAdmin) navigate("/admin", { replace: true });
    if (user.isAuth) navigate("/user", { replace: true });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const data = await login(email, password);
    if (data) {
      user.login(data);
      if (user.isAdmin) navigate("/admin");
      if (user.isAuth) navigate("/user");
    }
  };
  const {
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const onSubmit = () => {
    reset();
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h2 aria-hidden="true">Авторизація</h2>
          <div className={styles.control}>
            <label htmlFor="Email">Email</label>
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
            />

            {errors.Email && (
              <p className={styles.error}>{errors.Email.message}</p>
            )}
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              {...register("Password", {
                required: "Обовʼязкове поле",
                minLength: {
                  value: 6,
                  message: "Мінімум 6 символів",
                },
              })}
            />

            {errors.Password && (
              <p className={styles.error}>{errors.Password.message}</p>
            )}
          </div>

          <button type="submit" className={styles.button} disabled={!isValid}>
            Увійти
          </button>
          <div className={styles.login}>
            Немає акаунта?{" "}
            <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь!</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Login;
