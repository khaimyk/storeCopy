import { Routes, Route } from "react-router-dom";
import Shop from "../pages/Shop.jsx";
import Login from "../pages/Auth.jsx";
import Signup from "../pages/Auth.jsx";
import Basket from "../pages/Basket.jsx";
import Checkout from "../pages/Checkout.jsx";
import Product from "../pages/Product.jsx";
import Delivery from "../pages/Delivery.jsx";
import Contacts from "../pages/Contacts.jsx";
import NotFound from "../pages/NotFound.jsx";
import User from "../pages/User.jsx";
import UserOrders from "../pages/UserOrders.jsx";
import UserOrder from "../pages/UserOrder.jsx";
import Admin from "../pages/Admin.jsx";
import AdminOrders from "../pages/Admin/Orders.jsx";
import AdminOrder from "../pages/Admin/Order.jsx";
import AdminCategory from "../pages/Admin/Categories.jsx";
import AdminProduct from "../pages/Admin/Product.jsx";
import Catalog from "../pages/Catalog.jsx";
import CorporateOrders from "../pages/CorporateOrders.jsx";
import Cooperation from "../pages/Cooperation.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import { AppContext } from "./AppContext.js";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import {
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
  ADMIN_ROUTE,
  ADMIN_ORDER_ROUTE,
  CHECKOUT_ROUTE,
  CONTACTS_ROUTE,
  ADMIN_ORDERS_ROUTE,
  ADMIN_CATEGORY_ROUTE,
  ADMIN_PRODUCT_ROUTE,
  DELIVERY_ROUTE,
  NOT_FOUND_ROUTE,
  USER_ROUTE,
  USER_ORDERS_ROUTE,
  USER_ORDER_ROUTE,
  CATALOG_ROUTE,
  CORPORATE_ORDERS_ROUTE,
  COOPERATION_ROUTE,
  ABOUT_US_ROUTE,
} from "../utils/consts.js";

const publicRoutes = [
  { path: SHOP_ROUTE, Component: Shop },
  { path: LOGIN_ROUTE, Component: Login },
  { path: REGISTRATION_ROUTE, Component: Signup },
  { path: PRODUCT_ROUTE + "/:id", Component: Product },
  { path: BASKET_ROUTE, Component: Basket },
  { path: CHECKOUT_ROUTE, Component: Checkout },
  { path: DELIVERY_ROUTE, Component: Delivery },
  { path: CONTACTS_ROUTE, Component: Contacts },
  { path: NOT_FOUND_ROUTE, Component: NotFound },
  { path: CATALOG_ROUTE, Component: Catalog },
  { path: CORPORATE_ORDERS_ROUTE, Component: CorporateOrders },
  { path: COOPERATION_ROUTE, Component: Cooperation },
  { path: ABOUT_US_ROUTE, Component: AboutUs },
];

const authRoutes = [
  { path: USER_ROUTE, Component: User },
  { path: USER_ORDERS_ROUTE, Component: UserOrders },
  { path: USER_ORDER_ROUTE + "/:id", Component: UserOrder },
];

const adminRoutes = [
  { path: ADMIN_ROUTE, Component: Admin },
  { path: ADMIN_ORDERS_ROUTE, Component: AdminOrders },
  { path: ADMIN_ORDER_ROUTE + "/:id", Component: AdminOrder },
  { path: ADMIN_CATEGORY_ROUTE, Component: AdminCategory },
  { path: ADMIN_PRODUCT_ROUTE, Component: AdminProduct },
];

const AppRouter = observer(() => {
  const { user } = useContext(AppContext);
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {user.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
    </Routes>
  );
});

export default AppRouter;
