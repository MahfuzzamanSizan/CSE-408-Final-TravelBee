import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import ReviewList from "../../components/reviewlist/ReviewList";
import Review from "../review/Review";
import React from "react";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`https://travelbeeserver-kgqu.onrender.com/api/hotels/find/${id}`)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  console.log(id)
  

  const { dates, options } = useContext(SearchContext);
  //const { options } = useContext(SearchContext);



  //.................

  // const days =
  //   dates && dates[0] && dates[0].endDate && dates[0].startDate
  //     ? dayDifferece(dates[0].endDate, dates[0].startDate)
  //     : 0;

  useEffect(() => {
    // Save dates to local storage when dates change
    localStorage.setItem("dates", JSON.stringify(dates));
  }, [dates]);

  useEffect(() => {
    // Retrieve dates from local storage when component mounts
    const storedDates = localStorage.getItem("dates");
    if (storedDates) {
      const parsedDates = JSON.parse(storedDates);
      // Update context with retrieved dates
      // This assumes that you have a function to update dates in the SearchContext
      // Replace setDates with the actual function to update dates in your context
      // setDates(parsedDates);
    }
  }, []);

  console.log("Dates object:", dates);


  //.................


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

  //const days = dayDifferece(dates[0].endDate, dates[0].startDate)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);

    } else {
      navigate("/login")

    }

  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ?
        "loading..." :
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>

            
            <div className="tagContainer">
              {/* <button className="tags">{data.tags}</button> */}

              {/* {data.tags.map((tag, index) => (
                      <span key={index} className="tags">{tag}</span>
                      
                    ))} */}

            </div>
            
            
            
            <div className="hotelAddress">
            
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.description}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}> Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <Review/>
          <ReviewList />
          {/* <MailList />
          <Footer /> */}
        </div>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
