import { useState, useEffect } from "react";
import { fetchCategories } from "../../http/catalogAPI.js";

import EditCategory from "../../components/EditCategory.jsx";
import styles from "../../styles/Admin/Categories.module.scss";
import DeleteCategory from "../../components/DeleteCategory.jsx";

const AdminCategories = () => {
  const [categories, setCategories] = useState(null); // список загруженных категорий
  const [fetching, setFetching] = useState(true); // загрузка списка категорий с сервера
  const [isModal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false); // модальное окно создания-редактирования
  // для обновления списка после добавления, редактирования, удаления — изменяем состояние
  const [change, setChange] = useState(false);
  // id категории, которую будем редактировать — для передачи в <EditCategory id={…} />
  const [categoryId, setCategoryId] = useState(null);

  const handleCreateClick = () => {
    setCategoryId(0);
    setModal(true);
  };

  const handleUpdateClick = (id) => {
    setCategoryId(id);
    setModal(true);
  };
  const DeleteClick = (id) => {
    setDeleteModal(true);
    setCategoryId(id);
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <p>Loading..,</p>;
  }

  return (
    <section className={styles.container}>
      <h1>Категорії</h1>
      <button className={styles.button} onClick={() => handleCreateClick()}>
        Створити категорію
      </button>
      <EditCategory
        isVisible={isModal}
        onClose={() => setModal(false)}
        id={categoryId}
        setChange={setChange}
      />
      {categories.length > 0 ? (
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Назва</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => handleUpdateClick(item.id)}>
                      Редагувати
                    </button>
                  </td>
                  <td>
                    <button onClick={() => DeleteClick(item.id)}>
                      Видалити
                    </button>
                    <DeleteCategory
                      isVisible={deleteModal}
                      onClose={() => setDeleteModal(false)}
                      id={categoryId}
                      setChange={setChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Список категорій порожній</p>
      )}
    </section>
  );
};

export default AdminCategories;
