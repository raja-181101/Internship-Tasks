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
import Profile from "./Pages/Profile.jsx";
import CompleteProfile from "./Pages/CompleteProfile.jsx";
import OAuthSuccess from "./Pages/OAuthSuccess.jsx";
import GithubDashboard from "./Pages/GithubDashboard.jsx";

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
              <Route path="/oauth-success" element={<OAuthSuccess />}/>
              <Route path="/complete-profile" element={<CompleteProfile />}/>
              <Route path="/github" element={<ProtectedRoute><GithubDashboard /></ProtectedRoute>}/>
          </Routes>
      </BrowserRouter>
  );
}
export default App;