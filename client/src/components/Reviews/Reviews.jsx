import React, { useEffect, useState } from "react";

import styles from "../../styles/Reviews.module.scss";
import { Rating } from "react-simple-star-rating";
import { createProdRating, fetchProdRating } from "../../http/catalogAPI";

const Reviews = ({ productId, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      author,
      comment,
      rating,
    };
    onAddReview(newReview);
    setAuthor("");
    setComment("");
    setRating(0);
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Rating initialValue={rating} />
        <button type="submit">Submit Review</button>
      </form>
      <div className={styles.reviews}></div>
    </div>
  );
};

export default Reviews;
