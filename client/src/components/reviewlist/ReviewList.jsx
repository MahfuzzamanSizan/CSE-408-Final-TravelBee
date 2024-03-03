import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import "./reviewlist.css"
import { useLocation } from 'react-router-dom';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/reviews/findByHotel/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.statusText}`);
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // Function to render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "star active" : "star"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="reviewList">
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="reviewItem">
          <h3>Name: {review.username}</h3>
          <p> Review: {review.review}</p>
          <div className="starRating">{renderStarRating(review.rating)}</div>
          <p> Time: {new Date(review.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
