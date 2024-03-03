import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import HouseIcon from '@mui/icons-material/House';



import useFetch from "../../hooks/useFetch";

import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  let amount = 100;
  //temporary
  const { data: hotelCount} = useFetch("/hotels/get/hotelCount");
  const { data: userCount} = useFetch("/users/get/userCount");
  const { data: roomCount} = useFetch("/rooms/get/room/Count");


  switch (type) {
    case "user":
      data = {
        title: "USERS & ADMINS",
        isMoney: false,
        count: userCount,
        link: <Link to="/users" style={{ textDecoration: "none" }}>
          See all users  
       </Link>,
        icon: (
          <Link to="/users" style={{ textDecoration: "none" }}>
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          </Link>
        ),
      };
      break;
    case "hotel":
      data = {
        title: "HOTELS",
        isMoney: false,
        count: hotelCount,
        link: 
        <Link to="/hotels" style={{ textDecoration: "none" }}>
        View all hotels
        </Link>,
        icon: (
          <Link to="/hotels" style={{ textDecoration: "none" }}>
          <HouseIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}

          />
          </Link>
        ),
      };
      break;
    case "room":
      data = {
        title: "ROOMS",
        isMoney: false,
        count: roomCount,
        link:<Link to="/rooms" style={{ textDecoration: "none" }}>
        View all rooms
        </Link>,
        icon: (
          <Link to="/rooms" style={{ textDecoration: "none" }}>
          <HotelOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          /></Link>
        ),
      };
      break;
      // case "admin":
      // data = {
      //   title: "ADMIN",
      //   isMoney: false,
      //   count: 1,
      //   link: <Link to="/users" style={{ textDecoration: "none" }}>
      //   View all admin
      //   </Link>,
      //   icon: (
      //     <Link to="/users" style={{ textDecoration: "none" }}>
      //     <AccountBalanceWalletOutlinedIcon
      //       className="icon"
      //       style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
      //     /></Link>
      //   ),
      // };
      // break;
    
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
