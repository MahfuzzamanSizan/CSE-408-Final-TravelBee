import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, sethotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  console.log(hotelId)


  const { data, loading, error } = useFetch(`/hotels`)

  const { data: hotelData, loading: hotelLoading, error: hotelError } = useFetch(`http://localhost:8000/api/hotels/find/${hotelId}`)

  console.log(hotelData)



  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const createdAt = new Date().toISOString();
    const roomNumbers = rooms.split(",").map((room) => ({number:room}));
    const hotel = hotelData.name;
    console.log(hotel)
    console.log(roomNumbers)
    try {
      await axios.post(`http://localhost:8000/api/rooms/${hotelId}`, { ...info, hotel, roomNumbers, createdAt });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new room</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form>

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}

              <div className="formInput">
                <label>Rooms</label>
                <textarea onChange={e=>setRooms(e.target.value)} placeholder="Give comma between room numbers"/>
              </div>

              <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={e => sethotelId(e.target.value)}>
                  {loading ? "loading..." : data && data.map(hotel => (
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>

              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
