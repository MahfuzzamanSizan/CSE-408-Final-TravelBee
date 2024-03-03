import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        country: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("/auth/register", formData);
            // Handle successful registration, maybe redirect user to login page
            navigate("/login");
        } catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }
    };

    return (
        <div className="register">
            <div className="rContainer">
                <h2>Register for TravelBee</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="username" placeholder="Username" value={formData.username} onChange={handleChange} className="rInput" />
                    <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} className="rInput" />
                    <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} className="rInput" />
                    <input type="tel" id="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="rInput" />
                    <input type="text" id="city" placeholder="City" value={formData.city} onChange={handleChange} className="rInput" />
                    <input type="text" id="country" placeholder="Country" value={formData.country} onChange={handleChange} className="rInput" />
                    <button type="submit" disabled={loading} className="rButton">Register</button>
                    {error && <span className="error">{error}</span>}
                </form>
            </div>
        </div>
    );
};

export default Register;
