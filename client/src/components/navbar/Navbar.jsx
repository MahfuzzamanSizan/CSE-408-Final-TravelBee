import { useContext } from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const navigate = useNavigate()

  const { user } = useContext(AuthContext);

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.setItem("user", "")
    navigate("/")
    window.location.reload()
    logout(); // Call the logout function from AuthContext to clear the session
  };



  return (


    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo"><h2>TravelBee</h2></span>
        </Link>
        <div className="navItems">
          {user && (
            <Link
              to="/userprofile"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <span className="username">{user.username}</span>
            </Link>
          )}
          {user && <button className="navButton" onClick={handleLogout}>Logout</button>}
          {!user && (
            <>
              <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
                <button className="navButton">Register</button>
              </Link>
              <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                <button className="navButton">Login</button>
              </Link>

            </>
          )}

          <Link to="/chat" style={{ color: "inherit", textDecoration: "none" }}>
            <button className="navButton">Chatbot</button>
          </Link>



        </div>
      </div>
    </div>

    // <div className="navbar">
    //   <div className="navContainer">
    //     <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
    //       <span className="logo"><h2>TravelBee</h2></span>
    //     </Link>
    //     {user ? user.username : (<div className="navItems">
    //       <button className="navButton">Register</button>
    //       <button className="navButton">Login</button>
    //     </div>)}
    //   </div>
    // </div>
  )
}

export default Navbar