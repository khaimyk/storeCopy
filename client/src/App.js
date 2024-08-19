import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import Header from "./components/Header.jsx";
import { AppContext } from "./components/AppContext.js";
import { check as checkAuth } from "./http/userAPI.js";
import { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Loader from "./components/Loader.jsx";

import { fetchBasket } from "./http/basketAPI.js";

import axios from "axios";

const App = observer(() => {
  const { user, basket } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([checkAuth(), fetchBasket()])
      .then(
        axios.spread((userData, basketData) => {
          if (userData) {
            user.login(userData);
          }
          basket.products = basketData.products;
        })
      )
      .finally(() => setLoading(false));
  }, []);

  // показываем loader, пока получаем пользователя и корзину
  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
});

export default App;
