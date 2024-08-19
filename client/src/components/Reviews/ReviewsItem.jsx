import React, { useState, useEffect } from "react";
import styles from "../../styles/Reviews.module.scss";
import { Rating } from "react-simple-star-rating";
import { createReviews, fetchAllReviews } from "../../http/catalogAPI";

const ReviewsItem = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchAllReviews(productId).then((data) => setReviews(data));
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = createReviews({
        productId,
        rating,
        comment,
      });
      setReviews([...reviews, res.data]);
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={styles.reviews}>
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsItem;
