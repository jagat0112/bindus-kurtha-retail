import React, { useContext, useState, useEffect } from "react";
import ProductContext from "../context/Product/ProductContext";
import AddReview from "./AddReview";
import { Link } from "react-router-dom";
import EditReview from "./EditReview";
import axios from "axios";
import Rating from "./Review/Rating";

const Review = ({ id }) => {
  const productContext = useContext(ProductContext);
  const [editMode, setEditMode] = useState(false);
  const [deleteWarn, setDeleteWarn] = useState(false);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const [user, setUser] = useState("");
  const [canReview, setCanReview] = useState(false);
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
  }, []);
  const deleteReview = (review, id) => {
    productContext.deleteReview(review, id);
    productContext.loadProduct(id);
  };
  const setRating = (rating) => {
    setRatings(rating);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const form = { review, ratings };
    productContext.addReview(form, id);
    setRatings("");
    setReview("");
    setDeleteWarn(false);
  };
  return (
    <div>
      <p>Review</p>
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
                <p onClick={() => setEditMode(true)}>Edit</p>
                <p onClick={() => setDeleteWarn(true)}>Delete</p>
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
                    <button onClick={() => deleteReview(review._id, id)}>
                      Delete
                    </button>
                    <button onClick={() => setDeleteWarn(false)}>Cancel</button>
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
            <div>
              <h3>Write a review</h3>
              <form onSubmit={onSubmit}>
                <p>
                  Product Name:<strong>{productContext.product.name}</strong>{" "}
                </p>
                <label>Your Rating:</label>
                <AddReview ratings={setRating} />
                <label htmlFor="review">Your Review: </label>
                <br />
                <textarea
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
                <button type="submit">Add Review</button>
              </form>
            </div>
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
