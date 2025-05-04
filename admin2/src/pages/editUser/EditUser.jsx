import "./editUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const EditUser = ({ inputs, title }) => {


  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[3];
  const { data, loading, error } = useFetch(`/${path}/${id}`);
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

      const newUser = {
        ...info,
        // img: url,
        // isAdmin: true
      }

      console.log(newUser)
      console.log("https://travelbeeserver-kgqu.onrender.com/api/users/" + id)
      await axios.put(`https://travelbeeserver-kgqu.onrender.com/api/users/${id}`, newUser)

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
          <h1>Edit your Info</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={data.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
              alt=""
            />
          </div>
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

              <div className="formInput" key="username">
                <label>Username</label>
                <input onChange={handleChange} type="text" placeholder={data.username} id="username" />
              </div>

              <div className="formInput" key="email">
                <label>Email</label>
                <input onChange={handleChange} type="email" placeholder={data.email} id="email" />
              </div> 

               <div className="formInput" key="phone">
                <label>Phone</label>
                <input onChange={handleChange} type="text" placeholder={data.phone} id="phone" />
              </div>

               {/* <div className="formInput" key="tags">
                <label>Tags</label>
                <input onChange={handleChange} type="textarea" placeholder={data.tags} id="tags" />
              </div> */}

              {/*
              <div className="formInput" key="city">
                <label>City</label>
                <input onChange={handleChange} type="text" placeholder={data.city} id="city" />
              </div> */}


              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;