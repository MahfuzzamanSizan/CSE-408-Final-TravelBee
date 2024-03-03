import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext';
import "./reviewform.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = () => {
  const [review, setReview] = useState('');
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [rating, setRating] = useState(0);
  const [hotelId, setHotelId] = useState(); // Ensure you set the hotelId somewhere in your component
  const { user } = useContext(AuthContext);
  const { data: hotelData, loading: hotelLoading, error: hotelError } = useFetch(`http://localhost:8000/api/hotels/find/${id}`);

  const navigate = useNavigate()


  console.log(id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch hotel data
      const hotelData = await fetchHotelData();
      if (!hotelData) {
        console.error('Failed to fetch hotel data');
        return;
      }

      // Prepare form data
      const formData = {
        username: user.username,
        userId: user._id,
        hotelName: hotelData.name,
        hotelId: hotelData._id,
        review: review,
        rating: rating
      };

      const res = await axios.post("http://localhost:8000/api/reviews", formData);
      window.location.reload();
      

      console.log(formData); // For testing, you can replace this with actual submission logic
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const fetchHotelData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/hotels/find/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch hotel data: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      return null;
    }
  };

  const handleStarClick = (value) => {
    setRating(value === rating ? 0 : value); // Toggle star rating
  };

  return (
    <form className="reviewForm" onSubmit={handleSubmit}>
      <textarea className="textField" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
      <div className="ratingContainer">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className="star"
            color={star <= rating ? "#ffc107" : "#e4e5e9"}
            onClick={() => handleStarClick(star)}
          />
        ))}
      </div>
      <button className="submitBtn" type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
