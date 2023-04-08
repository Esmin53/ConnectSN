import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Profilepage from "./pages/profilepage/Profilepage";
import Friends from "./pages/friends/Friends";
import Profilepagetop from "./pages/profilepage/Profilepagetop";
import Redirect from "./redirect";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { updateFriends, updateRequsets, updateSentRequests } from "./redux/rootSlice";

function App() {
  let currentUser = useSelector(state => state);
  const dispatch = useDispatch()

  const stream = async () => {
    if(currentUser.user === null) {
      return
    }
    try {
      const res = await axios.get("http://localhost:3001/api/v1/user/stream", {
        headers: {
            Authorization: `Bearer ${currentUser.token}`
        }
    })
      dispatch(updateFriends(res.data.friends))
      dispatch(updateSentRequests(res.data.sentRequests))
      dispatch(updateRequsets(res.data.recievedRequests))
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    let interval
    if(currentUser != null) { 
    interval = setInterval(() => {
      stream()
    }, 5000);
    }

    return  () => clearInterval(interval)

  }, [currentUser.user])
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/myprofile/:id" element={<Profilepage />} />
          <Route path="/profile/:id" element={<Profilepage />} />
          <Route path="/navigate/:id" element={<Redirect />} />
          <Route path="/friends/:id" element={<>
            <Navbar />
            <Profilepagetop />
            <Friends />
          </>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
