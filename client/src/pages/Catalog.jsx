import { useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { fetchAllProducts, fetchCategories } from "../http/catalogAPI";
import { AppContext } from "../components/AppContext";
import ProductList from "../components/ProductList";

const getSearchParams = (searchParams) => {
  let category = searchParams.get("category");
  if (category && /[1-9][0-9]*/.test(category)) {
    category = parseInt(category);
  }
  let page = searchParams.get("page");
  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  }
  return { category, page };
};

const Catalog = observer(() => {
  const { catalog } = useContext(AppContext);

  const [categoriesFetching, setCategoriesFetching] = useState(true);
  const [productsFetching, setProductsFetching] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetchCategories()
      .then((data) => (catalog.categories = data))
      .finally(() => setCategoriesFetching(false));

    const { category, page } = getSearchParams(searchParams);
    catalog.category = category;

    catalog.page = page ?? 1;

    fetchAllProducts(catalog.category, catalog.page, catalog.limit)
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
    // eslint-disable-next-line
  }, []);

  // При каждом клике на категорию, бренд или номер страницы — мы добавляем элемент в историю
  // браузера, ссылки в истории имеют вид /?page=1, /?page=2, /?page=3. При нажатии кнопки
  // «Назад» браузера — мы отслеживаем изменение GET-параметров и изменяем состояние хранилища.
  useEffect(() => {
    const { category, page } = getSearchParams(searchParams);

    if (category || page) {
      if (category !== catalog.category) {
        catalog.category = category;
      }
      if (page !== catalog.page) {
        catalog.page = page ?? 1;
      }
    } else {
      catalog.category = null;
      catalog.page = 1;
    }
    // eslint-disable-next-line
  }, [location.search]);

  // при клике на категорию, бренд, номер страницы или при нажатии кнопки  «Назад»
  // браузера — получам с сервера список товаров, потому что это уже другой список
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

  return (
    <section>
      {/* {categoriesFetching ? <p>Loading...</p> : <CategoryBar />} */}
      {productsFetching ? <p>Loading...</p> : <ProductList />}
    </section>
  );
});

export default Catalog;
