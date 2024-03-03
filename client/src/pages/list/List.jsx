import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const navigate = useNavigate();
  const {dispatch} = useContext(SearchContext);

  const { data, loading, error, reFetch } = useFetch(`http://localhost:8000/api/hotels?city=${destination}&min=${min || 0}&max=${max || 1000}`);
  const { data: hotelData, loading: hotelLoading, error: hotelError } = useFetch("http://localhost:8000/api/hotels");
  console.log(hotelData)
  console.log("Dates object:", dates);


  //..............


  const [dest, setDest] = useState("");
 
  const [dt, setDt] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  
  const [opt, setOpt] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });



  const handleClick = () => {
    reFetch();
    dispatch({type:"NEW_SEARCH", payload:{dest:destination, dt:dates, opt:options}})
    navigate("/hotels", { state: { destination, dates, options } });
    
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e => setMax(e.target.value)} className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          {/* <div className="listResult">
            {loading ? "loading..." : <>
              {data.map(item => (
                <SearchItem item={item} key={item._id} />
              ))}

            </>}
          </div> */}
          
          <div className="listResult">
    {loading ? (
        "Loading..."
    ) : !destination ? (
        // If destination is null, show all hotels in the list
        <>
            {hotelData.map((item) => (
                <SearchItem item={item} key={item._id} />
            ))}
        </>
    ) : (
        // If destination is provided, render search results normally
        <>
            {data.map((item) => (
                <SearchItem item={item} key={item._id} />
            ))}
        </>
    )}
</div>

        </div>
      </div>
    </div>
  );
};

export default List;
