// Order.jsx
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./order.css";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../context/SearchContext";

const Order = () => {
    const [userData, setUserData] = useState(null);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [hotelId, setHotelId] = useState();
    const [roomId, setRoomId] = useState();
    const [suiteId, setSuiteId] = useState();
    const location = useLocation();
    const [roomData, setRoomData] = useState([]);
    //const { data, loading, error } = useFetch(`http://localhost:8000/api/hotels/find/${hotelId}`)
    const { data2 } = useFetch(`http://localhost:8000/api/rooms/${roomId}`)
    const { data: hotelData, loading: hotelLoading, error: hotelError } = useFetch(`http://localhost:8000/api/hotels/find/${hotelId}`);
    //const { data: getData, loading: getLoading, error: getError } = useFetch(`http://localhost:8000/api/rooms/${roomId}/`);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(hotelId)
    console.log(selectedRooms)
    console.log(roomId)
    console.log(suiteId)
 


    useEffect(() => {
        if (location.state) {
            const { userData, hotelData, hotelId, roomId, suiteId } = location.state;
            setUserData(userData);
            setSelectedRooms(roomId || []); // Ensure selectedRooms is initialized as an array
            setHotelId(hotelId);
            setRoomId(roomId);
            setSuiteId(suiteId);
           if (roomId && roomId.length > 0) {
            fetchRoomData(selectedRooms);
        }
        }
    }, [location.state]);


// ..............
    const { dates, options } = useContext(SearchContext);
    const data = hotelData;

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifferece(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }

    const days =
    dates && dates[0] && dates[0].endDate && dates[0].startDate
      ? dayDifferece(dates[0].endDate, dates[0].startDate)
      : 0;
    const cost = days * data.cheapestPrice * options.room

    const checkIn = dates[0].startDate;
    const checkOut= dates[0].endDate;




    const handleConfirmation = async(e) => {
        e.preventDefault();
        const username = user.username;
        const userId = user._id;
        const hotelName = hotelData.name;
        const address = hotelData.address;
        const city = hotelData.city;
        //const cost = hotelData.cost;


        console.log(username)
        // Implement your confirmation logic here
        try {
            await axios.post(`http://localhost:8000/api/orders` , {userId, username, hotelName, address, city, cost, checkIn,checkOut});
            // Handle successful registration, maybe redirect user to login page
            navigate("/order/transaction")
            
        } catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }     
       
    };

    const handleCancel = () => {
        // Implement your confirmation logic here
        navigate("/")
       
    };



    const fetchRoomData = async (roomIds) => {
        try {
            // Fetch room data for each selected room ID
            const promises = roomIds.map(id =>
                fetchRoomById(id)
            );
            const roomData = await Promise.all(promises);
            setRoomData(roomData.filter(room => room)); // Filter out null values
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    };

    ///........


    const fetchRoomById = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/rooms/availability/${roomId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch room data: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching room data by ID:', error);
            return null;
        }
    };

    


    return (
        <div className="order">
            <div className="order-container">
                <h1>Booking Details</h1>
                <div className="user-details">
                    <h2>User Details:</h2>
                    <p>Name: {user && user.username}</p>
                    <p>Email: {user && user.email}</p>
                    <p>Contact: {user && user.phone}</p>
                </div>
                <div className="hotel-details">
                    <h2>Hotel Details:</h2>
                    <p>Name: {hotelData.name}</p>
                    <p>Location: {hotelData.city} , {hotelData.address} </p>
                    <p>{hotelData.distance}m from center </p>
                </div>
                <div className="selected-rooms">
                    <h2>Selected Rooms:</h2>
                    {selectedRooms.length > 0 ? (
                        selectedRooms.map((room, index) => (
                           <p key={index}>Room ID: {room}</p>
                        ))
                    ) : (
                        <p>No rooms selected</p>
                    )}
                </div>
                <button className="confirm-button" onClick={handleConfirmation}>Confirm Reservation</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default Order;
