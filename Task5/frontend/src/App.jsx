import{ BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import User from "./Pages/User.jsx";
import Register from "./Pages/Register.jsx";
import EditUser from "./Pages/EditUser.jsx";
import Navbar from "./Components/Navbar.jsx";
import "./App.css"

function App(){
  return (
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/user"} element={<User />}/>
            <Route path={"/register"} element={<Register />}/>
            <Route path={"/user/:id/edit"} element={<EditUser/>}/>
          </Routes>
      </BrowserRouter>
  );
}
export default App;