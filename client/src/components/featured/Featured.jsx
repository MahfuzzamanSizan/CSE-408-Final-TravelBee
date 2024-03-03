import useFetch from "../../hooks/useFetch.js"
import SearchItem from "../searchItem/SearchItem.jsx";
import "./featured.css"
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Featured = () => {

    const { data, loading, error } = useFetch("http://localhost:8000/api/hotels/countByCity?cities=berlin,madrid,london");
    
    return (
        <div className="featured">
            {loading ? (
                "Loading please wait..."
            ) :
                <><div className="featuredItem">
                    <img width="300px" height="250px" src="https://a.cdn-hotels.com/gdcs/production47/d644/0f1f2695-8549-4f5f-bdf1-9deab5ffaba5.jpg?impolicy=fcrop&w=1600&h=1066&q=medium" alt="" className="featuredImg" />

                    <div className="featuredTitles">
                        <h1>Berlin</h1>
                        <h2>{data[0]} properties</h2>
                    </div>
                </div>

                    <div className="featuredItem">
                        <img width="300px" height="250px" src="https://mldvwwasb8tu.i.optimole.com/cb:esbD~6200b/w:948/h:632/q:90/ig:avif/f:best/https://travelaway.me/wp-content/uploads/2012/04/Madrid-cityscape.jpg" alt="" className="featuredImg" />

                        <div className="featuredTitles">
                            <h1>Madrid</h1>
                            <h2>{data[1]} properties</h2>
                        </div>
                    </div>


                    <div className="featuredItem">

                        <img width="300px" height="250px" src="https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>London</h1>
                            <h2>{data[2]} properties</h2>
                        </div>
                    </div></>}
        </div>
    )
}

export default Featured
