import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css"
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useContext } from "react";



const FeaturedProperties = () => {

  const [destination, setDestination] = useState("");
 

  const navigate = useNavigate();
  const { user} = useContext(AuthContext);


  const {dispatch} = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload:{destination}})
    navigate("/hotels", { state: { destination} });
  };

  const { data, loading, error} = useFetch("http://localhost:8000/api/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading? "loading...": <>
     {data.map((item) =>(
      <div className="fpItem" key={item._id}> 
      <img width="200px" height="150px" src={item.photos[0]} alt="" className="fpImg" />
      <span className="fpName"><Link to = {`/hotels/${item._id}`} style={{color: "inherit", textDecoration: "none"}}>{item.name}</Link></span>
      <span className="fpCity">{item.city}</span>
      <span className="fpPrice">starting from {item.cheapestPrice}$</span>
      {item.rating && <div className="fpRating">
        <button>{item.rating}</button>
        <span>Excellent</span>
      </div>}

    </div>
    ))}
    </>}
    </div>



  )
}

export default FeaturedProperties


