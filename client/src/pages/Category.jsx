import { useContext } from "react";
import { AppContext } from "../components/AppContext.js";
import { observer } from "mobx-react-lite";
import { useNavigate, createSearchParams } from "react-router-dom";

const Category = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id === catalog.category) {
      catalog.category = null;
    } else {
      catalog.category = id;
    }
    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: "/",
      search: "?" + createSearchParams(params),
    });
  };

  return (
    <section>
      {catalog.categories.map((item) => (
        <div
          key={item.id}
          active={item.id === catalog.category}
          onClick={() => handleClick(item.id)}
          style={{ cursor: "pointer" }}
        >
          {item.name}
        </div>
      ))}
    </section>
  );
});

export default Category;
