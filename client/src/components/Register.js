import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../JS/userSlice/UserSlice";
import { Link } from 'react-router-dom';

const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: ""
  });
  
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleRegister = () => {
    // Validation basique
    if (!register.name || !register.lastname || !register.email || !register.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    dispatch(userRegister(register));
  };

  return (
    <div>
      <div className="wrapper">
        <form onSubmit={(e) => e.preventDefault()} className="form-signin">       
          <h2 className="form-signin-heading">Please register</h2>
          
          {/* Affichage des messages d'état */}
          {status === "success" && <div className="alert alert-success">Inscription réussie!</div>}
          {status === "fail" && <div className="alert alert-danger">{error}</div>}
          
          <input 
            type="text" 
            className="form-control" 
            name="name" 
            placeholder="Name" 
            required 
            value={register.name}
            onChange={(e) => setRegister({...register, name: e.target.value})} 
          />
          <input 
            type="text" 
            className="form-control" 
            name="lastname" 
            placeholder="Lastname" 
            required 
            value={register.lastname}
            onChange={(e) => setRegister({...register, lastname: e.target.value})} 
          />
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            placeholder="Email Address" 
            required 
            value={register.email}
            onChange={(e) => setRegister({...register, email: e.target.value})} 
          />
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            placeholder="Password" 
            required 
            value={register.password}
            onChange={(e) => setRegister({...register, password: e.target.value})}
          />      
          <label className="checkbox">
            <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
          </label>
          <button 
            className="btn btn-lg btn-primary btn-block" 
            onClick={handleRegister}
            disabled={status === "pending"}
          >
            {status === "pending" ? "Loading..." : "Register"}
          </button>   
          <h5>u already have acoount <Link to="/login">sing in</Link>
          </h5>
        </form>
      </div>
    </div>
  )
}

export default Register;