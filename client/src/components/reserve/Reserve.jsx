import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useHistory } from "react-router-dom";



const Reserve = ({ setOpen, hotelId, userData, hotelData }) => {

    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`http://localhost:8000/api/hotels/room/${hotelId}`)
    const { dates } = useContext(SearchContext)
    //
    const [roomId, setRoomId] = useState(null);         

    console.log(data)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1);

        }
        return dates
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {

        const isFound = roomNumber.unavailableDates.some(date =>
            alldates.includes(new Date(date).getTime()));

        return !isFound;

    }



    // const handleSelect = (e) => {
    //     const checked = e.target.checked;
    //     const value = e.target.value;
    //     setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value));
    //     console.log(value);
        

    // }


    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
    
        // If checked is true, add the value to selectedRooms if it's not already there
        // If checked is false, remove the value from selectedRooms
        setSelectedRooms(prevSelectedRooms => {
            if (checked) {
                // Add value to selectedRooms if it's not already there
                if (!prevSelectedRooms.includes(value)) {
                    return [...prevSelectedRooms, value];
                }
            } else {
                // Remove value from selectedRooms
                return prevSelectedRooms.filter(item => item !== value);
            }
            return prevSelectedRooms; // If value already exists (or unchecked), return the previous state
        });
    
        
    }
    console.log(selectedRooms);
    

    



    const navigate = useNavigate();


    const handleClick = async () => {
        try {

            //

            const selectedRoomIds = selectedRooms.map((room) => room.roomNumber);
            setRoomId(selectedRoomIds);


            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`http://localhost:8000/api/rooms/availability/${roomId}`, { dates: alldates });
                return res.data;
            }))
            setOpen(false)

            navigate("/order", {
                state: {
                    userData: userData,
                    hotelData: hotelData,
                    hotelId: hotelId,
                    roomId: selectedRooms,
                    suiteId: roomId

                }
            });

        } catch (err) {

        }

    };

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() =>
                    setOpen(false)} />
                <span>Select your rooms : </span>
                {/* {data.map(item => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}

                        </div>

                    </div>
                ))} */}

                {data.map(item => (
                    <div key={item.id} className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div key={roomNumber._id} className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}



                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve
