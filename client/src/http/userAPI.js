import { guestInstance, authInstance } from "./index.js";
import { jwtDecode } from "jwt-decode";

export const signup = async (email, password) => {
  const { data } = await guestInstance.post("api/user/signup", {
    email,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  try {
    const { data } = await guestInstance.post("api/user/login", {
      email,
      password,
    });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (e) {
    alert(e.data.message);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const check = async () => {
  let userToken, userData;
  try {
    userToken = localStorage.getItem("token");
    // если в хранилище нет действительного токена
    if (!userToken) {
      return false;
    }
    // токен есть, надо проверить его подлинность
    const { data } = await authInstance.get("api/user/check");
    userToken = data.token;
    userData = jwtDecode(userToken);
    localStorage.setItem("token", userToken);
    return userData;
  } catch (e) {
    localStorage.removeItem("token");
    return false;
  }
};
