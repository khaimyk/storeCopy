import { useContext, useEffect, useState } from "react";
import SvgComponent from "../images/logo";
import styles from "../styles/Shop.module.scss";
import Tilt from "react-parallax-tilt";
import CategoryBar from "../components/CategoryBar";
import Advantages from "../components/Advantages";
import { observer } from "mobx-react-lite";
import { fetchCategories } from "../http/catalogAPI";
import { AppContext } from "../components/AppContext";
import Footer from "../components/Footer";

const Shop = observer(() => {
  const { catalog } = useContext(AppContext);

  const [categoriesFetching, setCategoriesFetching] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then((data) => (catalog.categories = data))
      .finally(() => setCategoriesFetching(false));

    // eslint-disable-next-line
  }, []);
  if (categoriesFetching) {
    return <p>Loading..,</p>;
  }
  return (
    <section>
      <div className={styles.logoSection}>
        <Tilt>
          <SvgComponent />
        </Tilt>
      </div>
      <CategoryBar />
      <Advantages />
      {/* {productsFetching ? <p>Loading...</p> : <ProductList />} */}
      <Footer />
    </section>
  );
});

export default Shop;
