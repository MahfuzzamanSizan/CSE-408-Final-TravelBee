import { useContext, useState } from "react"
import "./login.scss"
// import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const Login = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setCredentials((prev)=> ({...prev,[e.target.id]: e.target.value}));
    };

    const handleClick = async e =>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("https://travelbeeserver-kgqu.onrender.com/api/auth/login", credentials)
           
            if(res.data.isAdmin){
              dispatch({type: "LOGIN_SUCCESS", payload:res.data.details})
              navigate("/")
            }
            else{
                dispatch({type:"LOGIN_FAILURE", payload: {message:"You are not an admin"}})
            }
        }catch(err)
        {
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        }
    }

    

    return (
        <div className="login">
            <div className="lContainer">
                <h2>TravelBee ADMIN Login</h2>
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>

        </div>
    )
}

export default Login
