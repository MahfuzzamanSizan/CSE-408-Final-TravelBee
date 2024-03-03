import "./editHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const EditHotel = ({ inputs, title }) => {


  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[3];
  const { data, loading, error } = useFetch(`/${path}/find/${id}`);
  console.log(path, id, data);

  const [file, setFile] = useState("");

  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("file", file)
    // data.append("upload_preset", "upload")
    try {


      // const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/daq9b0bqv/image/upload", data)


      // const { url } = uploadRes.data

      const newHotel = {
        ...info,
        // img: url,
        // isAdmin: true
      }

      console.log(newHotel)
      console.log("http://localhost:8000/api/hotels/" + id)
      await axios.put(`http://localhost:8000/api/hotels/${id}`, newHotel)

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
          <h1>Edit hotel</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={data.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              <div className="formInput" key="name">
                <label>Hotel Name</label>
                <input onChange={handleChange} type="text" placeholder={data.name} id="name" />
              </div>

              <div className="formInput" key="city">
                <label>City</label>
                <input onChange={handleChange} type="city" placeholder={data.city} id="city" />
              </div> 

               <div className="formInput" key="address">
                <label>Address</label>
                <input onChange={handleChange} type="text" placeholder={data.address} id="address" />
              </div>

               <div className="formInput" key="distance">
                <label>Distance</label>
                <input onChange={handleChange} type="text" placeholder={data.distance} id="distance" />
              </div>

             <div className="formInput" key="description">
                <label>Description</label>
                <input onChange={handleChange} type="text" placeholder={data.description} id="description" />
              </div>


              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;