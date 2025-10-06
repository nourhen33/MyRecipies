import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes,useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, userCurrent } from "./JS/userSlice/UserSlice";
import Profils from "./components/Profils";
import PrivateRoute from "./routes.js/PrivateRoute";

function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
  }, []);
  return (
    <div className="App">
      <div className="header">
        {isAuth?<button onClick={()=>{dispatch(logout());
          navigate("/");
        }}>logout</button>: null}
      </div>

      <Routes>
        <Route exct path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profil" element={<Profils />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
