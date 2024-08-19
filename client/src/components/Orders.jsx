import { Link } from "react-router-dom";
import styles from "../styles/Orders.module.scss";
import { ADMIN_ORDER_ROUTE, USER_ORDER_ROUTE } from "../utils/consts";

const Orders = (props) => {
  if (props.items.length === 0) {
    return <p>Список замовлень порожній</p>;
  }

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Дата</th>
            <th>Покупець</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Статус</th>
            <th>Сума</th>
            <th>Детальніше</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.prettyCreatedAt}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>

              <td>
                {item.status === 0 && <span>Новий</span>}
                {item.status === 1 && <span>В процесі</span>}
                {item.status === 2 && <span>Завершений</span>}
              </td>
              <td>
                {item.amount}
                <span>грн</span>
              </td>
              <td>
                {props.admin ? (
                  <Link to={ADMIN_ORDER_ROUTE + "/" + item.id}>Детальніше</Link>
                ) : (
                  <Link to={USER_ORDER_ROUTE + "/" + item.id}>Детальніше</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Orders;
