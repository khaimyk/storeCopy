import {
  fetchOneProduct,
  updateProduct,
  fetchCategories,
} from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import UpdateProperties from "./UpdateProperties.jsx";
import {
  createProperty,
  updateProperty,
  deleteProperty,
} from "../http/catalogAPI.js";
import styles from "../styles/Admin/UpdateProduct.module.scss";
import { useForm } from "react-hook-form";

const defaultValue = { name: "", price: "", category: "" };
const defaultValid = { name: null, price: null, category: null };

const updateProperties = async (properties, productId) => {
  for (const prop of properties) {
    const empty = prop.name.trim() === "" || prop.value.trim() === "";
    // если вдруг старая хар-ка оказалась пустая — удалим ее на сервере
    if (empty && prop.id) {
      try {
        await deleteProperty(productId, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    /*
     * Если у объекта prop свойство append равно true — это новая хар-ка, ее надо создать.
     * Если у объекта prop свойство change равно true — хар-ка изменилась, ее надо обновить.
     * Если у объекта prop свойство remove равно true — хар-ку удалили, ее надо удалить.
     */
    if (prop.append && !empty) {
      try {
        await createProperty(productId, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    if (prop.change && !prop.remove) {
      try {
        await updateProperty(productId, prop.id, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    if (prop.remove) {
      try {
        await deleteProperty(productId, prop.id);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
  }
};

const UpdateProduct = (props) => {
  const { id, isVisible = false, onClose, setChange } = props;

  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState(defaultValid);

  // список категорий и список брендов для возможности выбора
  const [categories, setCategories] = useState(null);

  // выбранное для загрузки изображение товара
  const [image, setImage] = useState([]);

  // список характеристик товара
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (id) {
      // нужно получить с сервера данные товара для редактирования
      fetchOneProduct(id)
        .then((data) => {
          const prod = {
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
          };
          setValue(prod);
          // для удобства работы с хар-ми зададим для каждой уникальный идентификатор
          // и доп.свойства, которые подскажут нам, какой http-запрос на сервер нужно
          // выполнить — добавления, обновления или удаления характеристики
          setProperties(
            data.props.map((item) => {
              // при добавлении новой хар-ки свойство append принимает значение true
              // при изменении старой хар-ки свойство change принимает значение true
              // при удалении старой хар-ки свойство remove принимает значение true
              return {
                ...item,
                unique: uuid(),
                append: false,
                remove: false,
                change: false,
              };
            })
          );
        })
        .catch((error) => alert(error.response.data.message));
      // нужно получить с сервера список категорий и список брендов
      fetchCategories().then((data) => setCategories(data));
    }
  }, [id]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
     * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
     * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
     * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
     * «принял к сведению» наше сообщение, что состояние нужно изменить.
     */
    const correct = isValid(value);
    setValid(correct);

    // если введенные данные прошли проверку — можно отправлять их на сервер
    if (correct.name && correct.price && correct.category) {
      const data = new FormData();
      data.append("name", value.name.trim());
      data.append("price", value.price.trim());
      data.append("categoryId", value.category);
      if (image) data.append("image", image, image.name);

      // нужно обновить, добавить или удалить характеристики и обязательно дождаться
      // ответа сервера — поэтому функция updateProperties() объявлена как async, а
      // в теле функции для выполнения действия с каждой хар-кой используется await
      if (properties.length) {
        await updateProperties(properties, id);
      }

      updateProduct(id, data)
        .then((data) => {
          // сбрасываем поле загрузки изображения, чтобы при сохранении товара,
          // когда новое изображение не выбрано, не загружать старое повтороно
          event.target.image.value = "";
          // в принципе, мы могли бы сбросить все поля формы на дефолтные значения, но
          // если пользователь решит отредатировать тот же товар повтороно, то увидит
          // пустые поля формы — http-запрос на получение данных для редактирования мы
          // выполняем только тогда, когда выбран новый товар (изменился id товара)
          const prod = {
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
          };
          setValue(prod);
          setValid(isValid(prod));
          // мы получим актуальные значения хар-тик с сервера, потому что обновление
          // хар-тик завершилось еще до момента отправки этого http-запроса на сервер
          setProperties(
            data.props.map((item) => {
              return {
                ...item,
                unique: uuid(),
                append: false,
                remove: false,
                change: false,
              };
            })
          );
          // закрываем модальное окно редактирования товара
          onClose();
          // изменяем состояние, чтобы обновить список товаров
          setChange((state) => !state);
        })
        .catch((error) => alert(error.response.data.message));
    }
  };
  const {
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  return !isVisible ? null : (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          Редактирование товара
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              {...register("name", {
                required: "Обовʼязкове поле",

                minLength: {
                  value: 2,
                  message: "Мінімум 2 символа",
                },
                maxLength: {
                  value: 35,
                  message: "Максимум 35 символів",
                },
              })}
              value={value.name}
              onChange={(e) => handleInputChange(e)}
              placeholder="Название товара..."
            />
            {errors.name && <p>{errors.name.message}</p>}

            <select
              name="category"
              value={value.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="">Категория</option>
              {categories &&
                categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>

            <input
              {...register("price", {
                required: "Обовʼязкове поле",
              })}
              type="number"
              value={value.price}
              onChange={(e) => handleInputChange(e)}
              placeholder="Цена товара..."
            />
            {errors.price && <p>{errors.price.message}</p>}
            <input
              {...register("image", {
                required: "Обовʼязкове поле",
              })}
              type="file"
              multiple
              onChange={(e) => handleImageChange(e)}
              placeholder="Фото товара..."
            />
            {errors.image && <p>{errors.image.message}</p>}

            <UpdateProperties
              properties={properties}
              setProperties={setProperties}
            />
            <div>
              <div>
                <button type="submit" disabled={!isValid}>
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
