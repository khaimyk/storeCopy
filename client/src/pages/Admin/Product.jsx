import { useState, useEffect } from "react";
import { fetchAllProducts } from "../../http/catalogAPI.js";

import CreateProduct from "../../components/CreateProduct.jsx";
import UpdateProduct from "../../components/UpdateProduct.jsx";
import styles from "../../styles/Admin/Product.module.scss";
import DeleteProduct from "../../components/DeleteProduct.jsx";

// количество товаров на страницу
const ADMIN_PER_PAGE = 20;

const AdminProducts = () => {
  const [products, setProducts] = useState([]); // список загруженных товаров
  const [fetching, setFetching] = useState(true); // загрузка списка товаров с сервера
  const [createShow, setCreateShow] = useState(false); // модальное окно создания товара
  const [updateShow, setUpdateShow] = useState(false); // модальное окно редактирования
  const [deleteModal, setDeleteModal] = useState(false); // модальное окно удаления
  // для обновления списка после добавления, редактирования, удаления — изменяем состояние
  const [change, setChange] = useState(false);
  // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
  const [product, setProduct] = useState(null);

  // текущая страница списка товаров
  const [currentPage, setCurrentPage] = useState(30);
  // сколько всего страниц списка товаров
  const [totalPages, setTotalPages] = useState(10);

  // обработчик клика по номеру страницы
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setFetching(true);
  };

  // содержимое компонента <Pagination>
  const pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <div
        key={page}
        active={page === currentPage}
        activeLabel=""
        onClick={() => handlePageClick(page)}
      >
        {page}
      </div>
    );
  }

  const handleUpdateClick = (id) => {
    setProduct(id);
    setUpdateShow(true);
  };

  const handleDeleteClick = (id) => {
    setProduct(id);
    setDeleteModal(true);
  };

  useEffect(() => {
    fetchAllProducts(null, null, currentPage, ADMIN_PER_PAGE)
      .then((data) => {
        setProducts(data.rows);
        setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE));
      })
      .finally(() => setFetching(false));
  }, [change, currentPage]);

  if (fetching) {
    return <p>Loading..,</p>;
  }

  return (
    <section className={styles.container}>
      <h1>Продукти</h1>
      <button className={styles.button} onClick={() => setCreateShow(true)}>
        Створити продукт
      </button>
      <CreateProduct
        isVisible={createShow}
        onClose={() => setCreateShow(false)}
        setChange={setChange}
      />
      <UpdateProduct
        id={product}
        isVisible={updateShow}
        onClose={() => setUpdateShow(false)}
        setChange={setChange}
      />
      {products.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Назва</th>
                <th>Фото</th>
                <th>Категорія</th>
                <th>Ціна</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {item.image && (
                      <a href={process.env.REACT_APP_API_URL + item.image}>
                        фото
                      </a>
                    )}
                  </td>
                  <td>{item.category?.name || "NULL"}</td>
                  <td>
                    {item.price}
                    <span>грн</span>
                  </td>
                  <td>
                    <button onClick={() => handleUpdateClick(item.id)}>
                      Редагувати
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteClick(item.id)}>
                      Видалити
                    </button>
                    <DeleteProduct
                      isVisible={deleteModal}
                      onClose={() => setDeleteModal(false)}
                      id={product}
                      setChange={setChange}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      products={products}
                      setCurrentPage={setCurrentPage}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && <div>{pages}</div>}
        </div>
      ) : (
        <p>Список продуктів порожній</p>
      )}
    </section>
  );
};

export default AdminProducts;
