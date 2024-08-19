import { useEffect, useState, useContext } from "react";
import { fetchOneProduct, fetchProdRating } from "../http/catalogAPI.js";
import { useParams } from "react-router-dom";
import { append } from "../http/basketAPI.js";
import { AppContext } from "../components/AppContext.js";

import styles from "../styles/PageProducts.module.scss";
import { Rating } from "react-simple-star-rating";
import Reviews from "../components/Reviews/Reviews.jsx";
import Products from "../pages/Products.jsx";
import ReviewsItem from "../components/Reviews/ReviewsItem.jsx";
const Product = () => {
  const { id } = useParams();
  const { basket } = useContext(AppContext);
  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState(0);

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    fetchProdRating(id).then((data) => setReviews(data));
  }, [id]);

  const handleClick = (productId) => {
    append(productId).then((data) => {
      basket.products = data.products;
    });
  };
  const handleAddReview = (review) => {
    setReviews([...reviews, review]);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1 className={styles.title}>{product.name}</h1>
      <div className={styles.container}>
        <div className={styles.images}>
          {product.image ? (
            <img
              src={process.env.REACT_APP_API_URL + product.image}
              alt=""
              className={styles.current}
            />
          ) : (
            <img
              src="http://via.placeholder.com/300"
              alt=""
              className={styles.current}
            />
          )}
        </div>
        <div className={styles.product}>
          <p className={styles.price}>
            Ціна: <span>${product.price}</span>
          </p>
          <Rating initialValue={reviews.rates} />
          {/* <div>
            {rating ? (
              <div className={styles.star}>
                <p>
                  Рейтинг: {rating.rating}, голосов{rating.votes}
                  {rating.comment}
                </p>

                <Rating
                  allowFraction
                  readonly
                  size={24}
                  initialValue={rating.rating}
                />
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div> */}
          <div className={styles.color}>
            <div className={styles.description}>
              {!!product.props.length && (
                <div>
                  <h3>Характеристики</h3>
                  <table>
                    <tbody>
                      {product.props.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <button
              onClick={() => handleClick(product.id)}
              // className={styles.add}
              // disabled={!currentSize}
            >
              Add to cart
            </button>
            <button className={styles.favourite}>Add to favourites</button>
          </div>
        </div>
      </div>
      <div className={styles.products}>
        <Products />
      </div>
      <div className={styles.reviews}>
        <Reviews productId={id} onAddReview={handleAddReview} />

        {/* <h1>Створити відгук</h1>
        <Rating initialValue={review.stars} />
        <input
          value={review.comment}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={addTodo}>Надіслати</button>
        {reviews.map((item, index) => (
          <Reviews
            key={index}
            onDelete={deleteTodo}
            onComplete={completeTodo}
            item={item}
          />
        ))} */}
        {/* <Reviews productId={id} setRating={setRating} rating={rating} /> */}
      </div>
    </section>
  );
};

export default Product;
