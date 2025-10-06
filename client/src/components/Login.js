import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Correction de l'import
import { userLogin } from '../JS/userSlice/UserSlice';

const Login = () => { 
    const [login, setLogin] = useState({
      email: "",
      password: ""
    });
  
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const status = userState?.status || null;
  
  const handleLogin = (e) => {
    e.preventDefault(); 
    // Validation basique
    if (!login.email || !login.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    dispatch(userLogin(login));
    navigate("/profil");
  };
  
  return (
    <div className="wrapper">
      <form className="form-signin" onSubmit={handleLogin}>       
        <h2 className="form-signin-heading">Please login</h2>
        <input 
          type="email" 
          className="form-control" 
          name="email" 
          placeholder="Email Address" 
          required 
          value={login.email}
          onChange={(e) => setLogin({...login, email: e.target.value})} 
        />
        <input 
          type="password" 
          className="form-control" 
          name="password" 
          placeholder="Password" 
          required 
          value={login.password}
          onChange={(e) => setLogin({...login, password: e.target.value})}
        />   
        <label className="checkbox">
          <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
        </label>
        <button 
          className="btn btn-lg btn-primary btn-block" 
          onClick={()=>{
            dispatch(userLogin(login));
            setTimeout(()=>{
              navigate("/profil");
            },1000);
             setTimeout(()=>{
            window.location.reload();
            },1000);
          }}>Login</button>
        <p>You don't have an account? <Link to="/register">Register now</Link></p>
      </form>
    </div>
  )
}

export default Login;