import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Single = () => {

  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/${path}`);
  console.log(path, id, data);
  
  const selectedData = data.find(item => item._id === id.toString()); // Assuming 'id' is of the same type as 'item.id'
  //console.log(selectedData);



  const username = data && data.length > 4 ? selectedData.username : '';
  const email = data && data.length > 4 ? selectedData.email : '';
  const phone = data && data.length > 4 ? selectedData.phone : '';
  const city = data && data.length > 4 ? selectedData.city : '';
  const country = data && data.length > 4 ? selectedData.country : '';
  const img = data && data.length > 4 ? selectedData.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif";


  // useEffect(() => {
  //   setList(data);
  // }, [data]);

  return (
    
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to = {`/users/edit/${id}`}> <div className="editButton">Edit</div> </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">
                    {/* {data[4].email}  */}
                    {email}
                   
                    </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                  {city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{country}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
         {/* <div className="bottom">
           <h1 className="title">Last Transactions</h1>
           <List/>
        </div>  */}
      </div>
    </div>
  );
};

export default Single;
