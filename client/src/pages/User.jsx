import { useContext } from "react";
import { AppContext } from "../components/AppContext.js";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../http/userAPI.js";

const User = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    logout();
    user.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>Это личный кабинет постоянного покупателя магазина</p>
      <ul>
        <li>
          <Link to="/user/orders">История заказов</Link>
        </li>
      </ul>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default User;
