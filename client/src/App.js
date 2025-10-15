import "./App.css";
import { Route, Routes,useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, userCurrent } from "./JS/userSlice/UserSlice";
import Profils from "./components/Profils";
import PrivateRoute from "./routes.js/PrivateRoute";
import Navbarr from "./components/Navbarr";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./routes.js/AdminRoute"


function App() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const isAuth = localStorage.getItem("token");
   const [ping, setPing] = useState(false); 
  useEffect(() => {
    // Vérifie la présence du token et charge les infos utilisateur
    if (isAuth) {
      dispatch(userCurrent());
    }
  }, [ping]);
  
  return (
    <div className="App">
     
    <Navbarr/>

      <Routes>
        <Route exct path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profils ping={ping} setPing={setPing} />} />
        <Route path="/addrecipe" element={<AddRecipe setPing={setPing} />} />

      </Route>

      <Route element={<AdminRoute />}>
        <Route
    path="/admin-dashboard"
    element={<AdminDashboard setPing={setPing} />}/>


          
            
        </Route>
      </Routes>
    </div>
  );
}

export default App;
