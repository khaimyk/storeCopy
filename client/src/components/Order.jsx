import styles from "../styles/Order.module.scss";

const Order = (props) => {
  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Дата замовлення:</th>
            <th>Статус замовлення:</th>
            <th>Імʼя, прізвище:</th>
            <th>Email: </th>
            <th>Номер телефона:</th>
            <th>Адреса доставки:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.data.prettyCreatedAt}</td>
            <td>
              {props.data.status === 0 && <span>Новий</span>}
              {props.data.status === 1 && <span>В процесі</span>}
              {props.data.status === 2 && <span>Завершений</span>}
            </td>
            <td>{props.data.name}</td>
            <td>{props.data.email}</td>
            <td>{props.data.phone}</td>
            <td>{props.data.address}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className={styles.footer}>
            <th>Примітка: </th>
            <td colSpan={5}>{props.data.comment}</td>
          </tr>
        </tfoot>
      </table>

      <table className={styles.product}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Кількість</th>
            <th>Сума</th>
          </tr>
        </thead>
        {props.data.items.map((item) => (
          <tbody key={item.id}>
            <tr>
              <td>{item.name}</td>
              <td>
                {item.price}
                <span>грн</span>
              </td>
              <td>{item.quantity}</td>
              <td>
                {item.price * item.quantity}
                <span>грн</span>
              </td>
            </tr>
          </tbody>
        ))}
        <tfoot>
          <tr className={styles.footer}>
            <th colSpan={3}>Підсумок:</th>
            <td>
              {props.data.amount}
              <span>грн</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default Order;
