import React, { useEffect, useState } from 'react';
import "./singleHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const SingleHotel = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/${path}`);

  const selectedData = data.find(item => item._id === id.toString());

  const name = selectedData?.name || '';
  const type = selectedData?.type || '';
  const address = selectedData?.address || '';
  const city = selectedData?.city || '';
  const distance = selectedData?.distance || '';
  const title = selectedData?.title || '';
  const description = selectedData?.description || '';
  const cheapestPrice = selectedData?.cheapestPrice || '';
  const featured = selectedData?.featured || '';
  const images = selectedData?.photos || [];
  const rooms = selectedData?.rooms || [];
  const tags = selectedData?.tags || [];

  const { data: roomsData, loading: roomsLoading, error: roomsError } = useFetch(`http://localhost:8000/api/rooms`);
  console.log(roomsData);


  const roomHandler = (roomId) => {
    const room = roomsData.find(room => room._id === roomId);
    return room ? room.title : '';
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to={`/hotels/edit/${id}`}> <div className="editButton">Edit</div> </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              {images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Image ${index}`}
                  className="itemImg"
                />
              ))}
              <div className="details">
                <h1 className="itemTitle">{name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Catagory:</span>
                  <span className="itemValue">{type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{address}, {city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distance from center:</span>
                  <span className="itemValue"> {distance}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tags:</span>
                  <div className="tagsContainer">
                    {tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <span className="itemKey">Rooms:</span>
                  <div className="tagsContainer">
                    {rooms.map((room, index) => (
                      <span key={index} className="tag">{roomHandler(room)}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="roomsList"></div>
      </div>
    </div>
  );
}

export default SingleHotel;
