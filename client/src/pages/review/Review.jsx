// pages/Review.js
import React from 'react';
import "./review.css"
import ReviewForm from '../../components/reviewform/ReviewForm';


const Review = () => {
  return (
    <div>
      <h2 className="title">Write a Review</h2>
      <ReviewForm/>
    </div>
  );
}

export default Review;
