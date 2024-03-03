import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  const [info, setInfo] = useState({});

  const handleChange= (e) =>{
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value}))
  }

  const handleClick= async (e) =>{
    e.preventDefault()
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try{


      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/daq9b0bqv/image/upload", data)
    

      const {url} = uploadRes.data 

      const newUser = {
        ...info,
        img: url,
        isAdmin: true
      }


      await axios.post(`http://localhost:8000/api/auth/register`, newUser)

    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Admin/User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id}/>
                </div>
              ))}
              {/* <div className="formInput">
                <label>Admin</label>
                <select onChange={handleChange} id="isAdmin">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div> */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
