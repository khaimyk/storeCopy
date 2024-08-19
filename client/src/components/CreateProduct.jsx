import { createProduct, fetchCategories } from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import CreateProperties from "./CreateProperties.jsx";
import { useForm } from "react-hook-form";
import styles from "../styles/Admin/Product.module.scss";

const defaultValue = { name: "", price: "", category: "" };

const CreateProduct = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
  });
  const { isVisible = false, onClose, setChange } = props;
  const [value, setValue] = useState(defaultValue);

  // выбранное для загрузки изображение товара
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  const [drag, setDrag] = useState(false);

  // список характеристик товара
  const [properties, setProperties] = useState([]);

  // список категорий и список брендов для возможности выбора
  const [categories, setCategories] = useState(null);

  // нужно получить с сервера список категорий и список брендов
  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
  };
  function dragStartHandler(event) {
    event.preventDefault();
    setDrag(true);
  }
  function dragLeaveHandler(event) {
    event.preventDefault();
    setDrag(false);
  }

  const handleImageChange = (event) => {
    setImages([...event.target.files]);
  };

  function onDropHandler(event) {
    event.preventDefault();
    let files = [...event.dataTransfer.files];
    const data = new FormData();
    for (let i = 0; i < files.length; i++) data.append("image", files[i]);
  }

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("name", value.name.trim());
    data.append("price", value.price.trim());
    data.append("categoryId", value.category);
    if (images.length) {
      for (let i = 0; i < images.length; i++) data.append("image", images[i]);
    }
    // добавляем изображения товара

    // if (image.length) {
    //   for (let i = 0; i < image.length; i++)
    //     data.append("image", image[0], image[0].name);
    // if (images.length) {
    //   for (let i = 0; i < images.length; i++) data.append("image", images[i]);
    // }

    // характеристики нового товара
    if (properties.length) {
      const props = properties.filter(
        (prop) => prop.name.trim() !== "" && prop.value.trim() !== ""
      );
      if (props.length) {
        data.append("props", JSON.stringify(props));
      }
    }

    createProduct(data)
      .then((data) => {
        reset(
          {
            name: "",
            price: "",
            category: "",
            image: [],
            props: [],
          },
          {
            shouldUnregister: true,
          }
        );
        console.log(data);
        // закрываем модальное окно создания товара
        onClose();

        // изменяем состояние, чтобы обновить список товаров
        setChange((state) => !state);
      })
      .catch((error) => alert(error.response.data.message));
  };
  // const renderFileList = () => (
  //   <ol>
  //     {[...images].map((f, i) => (
  //       <li key={i}>
  //         {f.name} - {f.type}
  //       </li>
  //     ))}
  //   </ol>
  // );

  return !isVisible ? null : (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          Створення продукта
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>

        <div>
          <form
            encType="multipart/form-data"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="name"></label>
            <input
              {...register("name", {
                required: "Обовʼязкове поле",

                minLength: {
                  value: 2,
                  message: "Мінімум 2 символа",
                },
                maxLength: {
                  value: 95,
                  message: "Максимум 95 символів",
                },
              })}
              value={value.name}
              onChange={(e) => handleInputChange(e)}
              placeholder="Назва продукту..."
            />
            {errors.name && <p>{errors.name.message}</p>}
            <label htmlFor="category"></label>
            <select
              name="category"
              value={value.category}
              onChange={(e) => handleInputChange(e)}
            >
              {categories &&
                categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <label htmlFor="price"></label>
            <input
              {...register("price", {
                required: "Обовʼязкове поле",
              })}
              type="number"
              value={value.price}
              onChange={(e) => handleInputChange(e)}
              placeholder="Ціна продукту..."
            />
            {errors.price && <p>{errors.price.message}</p>}
            {/* {drag ? (
              <div
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
                className={styles.drag}
              >
                Відпустіть файли, щоб завантажити
              </div>
            ) : (
              <div
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
                className={styles.dragImage}
              >
                Перетягніть файли, щоб завантажити
              </div>
            )} */}
            <label htmlFor="image"></label>
            <input
              type="file"
              name="image"
              multiple={true}
              onChange={handleImageChange}
              placeholder="Фото продукту..."
            />

            {/* {renderFileList()} */}
            {errors.image && <p>{errors.image.message}</p>}
            {imageURLS.map((imageSrc) => (
              <img src={imageSrc} alt="not fount" width={"250px"} />
            ))}
            <CreateProperties
              properties={properties}
              setProperties={setProperties}
            />

            <button type="submit" disabled={!isValid}>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
