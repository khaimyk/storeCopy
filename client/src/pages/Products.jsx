import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import ProductItem from "../components/ProductItem";
import styles from "../styles/ProductList.module.scss";
import { AppContext } from "../components/AppContext";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CATALOG_ROUTE } from "../utils/consts";

const ProductList = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (page) => {
    catalog.page = page;
    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: CATALOG_ROUTE + "/",
      search: "?" + createSearchParams(params),
    });
  };
  const pages = [];
  for (let page = 1; page <= catalog.pages; page++) {
    pages.push(
      <div
        key={page}
        active={page === catalog.page ? "true" : ""}
        onClick={() => handleClick(page)}
      >
        {page}
      </div>
    );
  }
  return (
    <section className={styles.container}>
      <div className={styles.products}>
        {catalog.products.length ? (
          catalog.products.map((item) => (
            <ProductItem key={item.id} data={item} />
          ))
        ) : (
          <p className="m-3">По вашему запросу ничего не найдено</p>
        )}
      </div>
    </section>
  );
});

export default ProductList;
