import React, { useContext, useEffect, useState } from 'react';
import "./userprofile.css";
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';

const Userprofile = () => {
    const { user } = useContext(AuthContext);
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/orders/getUserOrder/${user._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user orders');
                }
                const data = await response.json();
                setUserOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (user && user._id) {
            fetchUserOrders();
        }
    }, [user]);

    return (
        <div className="profile">
            <h2>User Profile</h2>
            <div className="profile-details">
                <div className="profile-item">
                    <img
                        src={user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                        alt="User Avatar"
                        className="profile-image"
                    />
                </div>
                <div className="profile-info">
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                </div>
            </div>
            {/* Display user orders */}
            <h3>User Bookings:</h3>
            
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul className="order-list">
                    {userOrders.map(order => (
                        <li key={order.id}>
                            <div className="order-info">
                                <p><strong>Hotel Name:</strong> {order.hotelName}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>City:</strong> {order.city}</p>
                                <p><strong>Cost:</strong> {order.cost}</p>
                                <p><strong>Check-in:</strong> {new Date(order.checkIn).toLocaleString()}</p>
                                <p><strong>Check-out:</strong> {new Date(order.checkOut).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Userprofile;
