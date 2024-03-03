import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Order from "./pages/order/Order.jsx";
import Transaction from "./pages/transaction/Transaction.jsx";
import Review from "./pages/review/Review.jsx";
import Chat from "./pages/chat/Chat.jsx";
import Userprofile from "./pages/userprofile/Userprofile.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/order/transaction" element={<Transaction/>}/>
        <Route path="/hotels/:id" element={<Review/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/userprofile" element={<Userprofile/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
