import React, { useState, useContext } from "react";
import ProductContext from "../../context/Product/ProductContext";
import AddReview from "./AddReview";
const EditReview = ({ review, id, productId }) => {
  const productContext = useContext(ProductContext);
  const [ratings, setRatings] = useState("");
  const [reviews, setReviews] = useState(review);
  const [editDone, setEditDone] = useState(false);

  const setRating = (rating) => {
    setRatings(rating);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const reviewUpdated = { ratings, review: reviews };
    productContext.updateReview(reviewUpdated, id, productId);
    setReviews("");
    setEditDone(true);
  };

  return (
    <div>
      {!editDone && (
        <div>
          <h3>Update a review</h3>
          <form onSubmit={onSubmit}>
            <label>Your Rating:</label>
            <AddReview ratings={setRating} />
            <label htmlFor="review">Your Review: </label>
            <br />
            <textarea
              className="rating-text-area"
              type="text"
              maxLength="200"
              name="reviews"
              value={reviews}
              placeholder="Max Lenght 200 characters"
              onChange={(e) => {
                setReviews(e.target.value);
              }}
            ></textarea>
            <br />
            <button className="cart-btn rating-update-btn" type="submit">
              Update Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditReview;
