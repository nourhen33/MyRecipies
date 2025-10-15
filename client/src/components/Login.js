import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../JS/userSlice/UserSlice';
import './Login.css';

const Login = () => { 
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    dispatch(userLogin(login));

    setTimeout(() => {
      navigate("/profil");
    }, 800);
  };

  return (
     <div className="auth-container">
      <div className="auth-image">
        <img src="/images/pizza.jpg"alt="Login" className="auth-img" />
      </div>

      <div className="auth-form">
        <form onSubmit={handleLogin} className="form-box">

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              required
            />
          </div>

          <div className="remember">
            <input type="checkbox" id="rememberMe" />
            <label>Remember me</label>
          </div>

          <button type="submit" className="btn-auth">
            {status === 'loading' ? 'Connexion...' : 'Sign In'}
          </button>

          <p className="redirect-text">
             Don’t have an account?{" "} <Link to="/">  Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};


export default Login;
