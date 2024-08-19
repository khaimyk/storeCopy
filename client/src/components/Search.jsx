import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Search.module.scss";
import { AppContext } from "./AppContext";
import { fetchAllProducts } from "../http/catalogAPI";
import ProductList from "./ProductList";

const Search = (props) => {
  const { isVisible = false, onClose } = props;
  const [searchValue, setSearchValue] = useState("");
  const [productsFetching, setProductsFetching] = useState(true);
  const { catalog } = useContext(AppContext);
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });
  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };
  useEffect(() => {
    setProductsFetching(true);
    fetchAllProducts(catalog.category, catalog.page, catalog.limit)
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
    // eslint-disable-next-line
  }, [catalog.category, catalog.page]);
  const SearchResult = () =>
    catalog.products
      .filter((product) => {
        if (product.name.includes(searchValue)) {
          return true;
        }
        return false;
      })
      .map((product) => <ProductList key={product.data} />);
  return !isVisible ? null : (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h1> Форма для пошуку товарів</h1>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
        </div>

        <div className={styles.search}>
          <label htmlFor="search">Пошук:</label>
          <input
            type="search"
            name="search"
            placeholder="Введіть назву"
            autoComplete="off"
            onChange={handleSearch}
            value={searchValue}
          />
          <button type="submit">Пошук</button>
        </div>
        <div className={styles.box}>{SearchResult()}</div>

        {/* {searchValue && (
          <div className={styles.box}>
            {isLoading
              ? "Loading"
              : !data.length
              ? "No results"
              : data.map(({ title, images, id }) => {
                  return (
                    <Link
                      key={id}
                      onClick={() => setSearchValue("")}
                      className={styles.item}
                      to={`/products/${id}`}
                    >
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      />
                      <div className={styles.title}>{title}</div>
                    </Link>
                  );
                })}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Search;
