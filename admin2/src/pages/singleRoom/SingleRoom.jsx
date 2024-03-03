import React, { useEffect, useState } from 'react';
import "./singleRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const SingleHotel = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];
  const { data, loading, error, requestAbort} = useFetch(`/${path}`);

  console.log(path);
  console.log(id);

  const selectedData = data.find(item => item._id === id.toString());

  const title = selectedData?.title || '';
  const price = selectedData?.price || '';
  const hotel = selectedData?.hotel || '';
  const maxPeople = selectedData?.maxPeople || '';
  const desc = selectedData?.desc || '';
  const roomNumbers = selectedData?.roomNumbers || [];
  const createdAt = selectedData?.createdAt || '';
  const updatedAt = selectedData?.updatedAt || '';
  const numberPart = selectedData?.roomNumbers?.map(room => room.number) || [];


  console.log(selectedData);
  console.log(numberPart);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/rooms/edit/${id}`}> <div className="editButton">Edit</div> </Link>
            <h1 className="title">Information</h1>
            <div className="item">

              <div className="details">
                <h1 className="itemTitle">{title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Hotel:</span>
                  <span className="itemValue">{hotel}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Max People:</span>
                  <span className="itemValue">{maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">description:</span>
                  <span className="itemValue">{desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Room Numbers:</span>
                  <div className="itemValue">
                    {numberPart.map((number, index) => (
                      <div key={index}>{number}</div>
                    ))}
                  </div>
                </div>

                {/* <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{createdAt}</span>
                </div> */}
                {/* <div className="detailItem">
                  <span className="itemKey">Updated At:</span>
                  <span className="itemValue">{updatedAt}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="roomsList">

        </div>
      </div>
    </div>
  );
}

export default SingleHotel;
