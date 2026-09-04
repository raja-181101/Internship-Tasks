import{ BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import User from "./Pages/User.jsx";
import Register from "./Pages/Register.jsx";
import EditUser from "./Pages/EditUser.jsx";
import Navbar from "./Components/Navbar.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import aboutProject from "./Components/AboutProject.jsx";
import "./App.css"
import Login from "./Pages/Login.jsx";
import AboutProject from "./Components/AboutProject.jsx";
import profile from "./Pages/Profile.jsx";
import Profile from "./Pages/Profile.jsx";

function App(){
  return (
      <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path={"/user"} element={<ProtectedRoute><User /></ProtectedRoute>}/>
              <Route path={"/register"} element={<Register />}/>
              <Route path={"/user/:id/edit"} element={<ProtectedRoute><EditUser /></ProtectedRoute>}/>
              <Route path={"/about"} element={<ProtectedRoute><AboutProject /></ProtectedRoute>}/>
              <Route path={"/profile"} element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
              <Route path="/login" element={<Login />}/>
          </Routes>
      </BrowserRouter>
  );
}
export default App;