import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Profilepage from "./pages/profilepage/Profilepage";
import Friends from "./pages/friends/Friends";
import Profilepagetop from "./pages/profilepage/Profilepagetop";
import Redirect from "./redirect";

function App() {
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
            <Profilepagetop />
            <Friends />
          </>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
