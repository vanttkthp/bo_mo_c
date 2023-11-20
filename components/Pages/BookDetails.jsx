import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function BookDetails () {
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName")
  const { id } = useParams();
  const [reviewError, setReviewError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [hoverValue, setHoverValue] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [ratingError, setRatingError] = useState("");
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    publishedDate: "",
    pages: "",
    category: "",
    bookCover: "",
  });

  useEffect(() => {
    loadBook();
    loadReviews();
  }, []);
  const [order, setOrder] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookCategory: "",
    bookPages: "",
    bookId: "",
    userName: "",
    quantity: "",
    orderStatus: "",
    orderQuantity: "",
    userEmail: "",
  });

  function submitOrder() {
    const orderData = {
      ...order,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookCategory: book.category,
      bookPages: book.pages,
      bookId: book.id,
      userName: userName,
      orderQuantity: quantity,
      userEmail: userEmail,
    };
    axios
      .post("http://localhost:8080/order", orderData)
      .then(() => {
        setOrderSuccess(true);

        setTimeout(() => {
          setOrderSuccess(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [review, setReview] = useState({
    reviewer: userName,
    rating: "",
    text: "",
    book: id,
  });
  function submitReview() {
    if (!review.text) {
      setReviewError("Please enter a review");
      return;
    }
    if (rating === 0) {
      setRatingError("Please select a rating");
      return;
    }
  
    const reviewData = {
      ...review,
      reviewer: userName,
      rating: rating,
    };
  
    axios
      .post("http://localhost:8080/review", reviewData)
      .then((response) => {
        const newReview = response.data;
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setRating(0);
        setReview((prevReview) => ({
          ...prevReview,
          rating: 0,
          text: "",
        }));
        setReviewError("");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    console.log(review);
  }, [review]);

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8080/book/${id}`);
    setBook(result.data);
  };
  const [reviews, setReviews] = useState([]);
  const loadReviews = async () => {
    const result = await axios.get(`http://localhost:8080/reviews/book/${id}`);
    setReviews(result.data);
  };

  function updateReview(value) {
    setReview((prevReview) => ({ ...prevReview, text: value }));
    setReviewError("");
  }

  const handleStarClick = (value) => {
    setRating(value);
    setRatingError(""); 
  };

  const handleStarHover = (value) => {
    setHoverValue(value);
  };

  const handleStarLeave = () => {
    setHoverValue(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className="rating-star"
          color={(hoverValue || rating) >= i ? "#ffbf00" : "#ccc"}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        />
      );
    }
    return stars;
  };

  const handleKeyPress = (event) => {
    const enteredValue = event.target.value + event.key;
    if (enteredValue < 1) {
      event.preventDefault();
    }
  };
  function submitReviewOnEnter(event) {
    if (event.charCode === 13 && !event.shiftKey)  {
      event.preventDefault();
      submitReview();
    }
  }
  return (
    <div>
      {orderSuccess && (
        <div className="alert alert-success mt-3" role="alert">
          Added successfully! Please check your cart.
        </div>
      )}
      <div
        className="container card shadow border mb-5"
        style={{ backgroundColor: "#white" }}
      >
        <div className="container mt-4">
          <div className="row mb-4">
            <div className="col-md-4 text-center">
              <img
                src={book.bookCover}
                alt={book.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h2>{book.title}</h2>
              <h4 className="text-muted">{book.author}</h4>
              <p>{book.description}</p>
              <p>
                <strong>Sold Quantity: {book.soldQuantity}</strong>
              </p>
              {localStorage.getItem("isUser") ? (
                <>
                  <p>Order:</p>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      className="form-control mr-2"
                      id="quantity w-auto"
                      min="1"
                      onKeyPress={handleKeyPress}
                      style={{ width: "80px" }}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn btn-outline-dark"
                        style={{ width: "110px" }}
                        onClick={() => submitOrder()}
                      >
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        {localStorage.getItem("isUser") || localStorage.getItem("isAdmin") ? (
          <div>
            <div className="form-group">
              <label htmlFor="review" className="h4">
                Let everyone know your review :
              </label>
              <form></form>
              
              <div className="rating mb-3">{renderStars()}</div>
              <textarea
                className="form-control"
                id="review"
                rows="3"
                name="commment"
                onChange={(e) => updateReview(e.target.value)}
                onKeyPress={submitReviewOnEnter}
                required
              ></textarea>
              {reviewError && <p className="text-danger">{reviewError}</p>}
              {ratingError && <p className="text-danger">{ratingError}</p>}
            </div>
            <button
              className="btn btn-outline-dark"
              onClick={() => submitReview()}
            >
              Submit Review
            </button>
            <hr />
          </div>
        ) : (
          <h4 className="text-center">Login to review</h4>
        )}
      </div>
      <div>
        <h4>Comments</h4>
        {reviews.map((review) => (
          <div key={review.id}>
            
            <div>
            <p className="h5">
              {review.reviewer}
            </p>
              {[...Array(review.rating)].map((_, index) => (
                <FaStar key={index} color="gold" />
              ))}
            </div>
            <p>{review.text}</p>
            <hr />
          </div>
        ))}
      </div>
      <style>
        {`
        p {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 100px;
          line-height: 1.5;
        }
        `}
      </style>
    </div>
  );
};


export default BookDetails;