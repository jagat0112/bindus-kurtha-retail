import React, { useContext, useState, useEffect } from "react";
import ProductContext from "../../context/Product/ProductContext";
import AddReview from "./AddReview";
import { Link } from "react-router-dom";
import EditReview from "./EditReview";
import axios from "axios";
import Rating from "./Rating";

const Review = ({ id }) => {
  const productContext = useContext(ProductContext);
  const [canReview, setCanReview] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const [user, setUser] = useState("");
  const [reviewUser, setReviewUser] = useState("");
  useEffect(() => {
    const getMe = async () => {
      const me = await axios.get("/api/v1/auth/me");
      const review = await axios.get(`/api/v1/clothings/${id}/review`);
      setReviewUser(review.data.review);
      setUser(me.data.data);
      review.data.review === []
        ? setCanReview(true)
        : review &&
          review.data.review.map((use) => {
            switch (use.user === me.data.data._id) {
              case true:
                setCanReview(false);
                break;
              case false:
                setCanReview(true);
            }
          });
    };
    getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteReview = (review, id) => {
    productContext.deleteReview(review, id);
  };
  const setRating = (rating) => {
    setRatings(rating);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const form = { review, ratings };
    productContext.addReview(form, id);
    console.log(form, id);
    setRatings("");
    setReview("");
    setDeleteWarn(false);
    setCanReview(false);
  };
  return (
    <div className="review-box">
      <p className="review-title">Review</p>
      {productContext.product.reviews.map((review) => {
        return (
          <div key={review._id} style={{ margin: "10px" }}>
            <p>
              <strong>
                {user._id === review.user ? "You" : review.username}
              </strong>{" "}
            </p>
            <Rating rating={review.ratings} />
            <p>{review.review}</p>
            {user._id === review.user && (
              <div>
                <button
                  className="rating-edit-btn"
                  onClick={() => {
                    setEditMode(true);
                    setDeleteWarn(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="rating-edit-btn"
                  onClick={() => {
                    setDeleteWarn(true);
                    setEditMode(false);
                  }}
                >
                  Delete
                </button>
                {editMode && (
                  <EditReview
                    review={review.review}
                    id={review._id}
                    productId={id}
                  />
                )}
                {deleteWarn && (
                  <div>
                    <p>Are you sure to delete the review?</p>
                    <button
                      className="rating-edit-btn"
                      onClick={() => deleteReview(review._id, id)}
                    >
                      Delete
                    </button>
                    <button
                      className="rating-edit-btn"
                      onClick={() => setDeleteWarn(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
            <p>
              Reviewed in {new Date(review.createAt).toString().slice(4, 15)}
            </p>
          </div>
        );
      })}
      <div className="review">
        {localStorage.token ? (
          <div>
            {canReview ? (
              <div>
                <h3>Write a review</h3>
                <form onSubmit={onSubmit}>
                  <p className="product-name text-left">
                    Product Name:<strong>{productContext.product.name}</strong>{" "}
                  </p>
                  <label className="rating-title">Your Rating:</label>
                  <AddReview ratings={setRating} />
                  <label htmlFor="review" className="rating-review">
                    Your Review:{" "}
                  </label>
                  <br />
                  <textarea
                    className="rating-text-area"
                    type="text"
                    maxLength="200"
                    name="reviews"
                    value={review}
                    placeholder="Max Lenght 200 characters"
                    onChange={(e) => {
                      setReview(e.target.value);
                    }}
                  ></textarea>
                  <br />
                  <button className="rating-submit-btn" type="submit">
                    Add Review
                  </button>
                </form>
              </div>
            ) : (
              <p className="rating-req">
                *You can only give a single review to this product.
              </p>
            )}
          </div>
        ) : (
          <div>
            <label>Login in to write the review</label>
            <br />
            <Link exact to={"/login"} className="btn-primary">
              LOGIN
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
