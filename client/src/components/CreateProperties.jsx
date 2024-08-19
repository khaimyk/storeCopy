import styles from "../styles/Admin/Product.module.scss";

const CreateProperties = (props) => {
  const { properties, setProperties } = props;

  const append = () => {
    setProperties([...properties, { name: "", value: "", number: Date.now() }]);
  };
  const remove = (number) => {
    setProperties(properties.filter((item) => item.number !== number));
  };
  const change = (key, value, number) => {
    setProperties(
      properties.map((item) =>
        item.number === number ? { ...item, [key]: value } : item
      )
    );
  };

  return (
    <div className={styles.properties}>
      <h5>Характеристики</h5>
      <button type="button" onClick={append}>
        Добавити
      </button>

      {properties.map((item) => (
        <div className={styles.propInput} key={item.number}>
          <input
            name={"name_" + item.number}
            value={item.name}
            onChange={(e) => change("name", e.target.value, item.number)}
            placeholder="Назва..."
          />
          <input
            name={"value_" + item.number}
            value={item.value}
            onChange={(e) => change("value", e.target.value, item.number)}
            placeholder="Значення..."
          />

          <button onClick={() => remove(item.number)}>Видалити</button>
          <button type="button" onClick={append}>
            Добавити
          </button>
        </div>
      ))}
    </div>
  );
};

export default CreateProperties;
