import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../JS/userSlice/UserSlice";
import { Link } from 'react-router-dom';
import './register.css'


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
    // Validation 
    if (!register.name || !register.lastname || !register.email || !register.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    dispatch(userRegister(register));
  };

  return (
     <div className="register-page d-flex align-items-center justify-content-center">
      <div className="register-container shadow-lg d-flex">
        {/*   images */}
        <div className="register-left">
          <img
            src="images/salad2.jpg"
            alt="Salad 1"
            className="food-img top-img"
          />
          <img
            src="/images/salad3.jpg"
            alt="Salad 3"
            className="food-img middle-img"
          />
          <img
            src="/images/salad4.jpg"
            alt="Salad 3"
            className="food-img bottom-img"
          />
        </div>

         {/* formulaire  */}
        <div className="register-right p-5 flex-grow-1">
          <h2 className="fw-bold text-dark mb-4 text-center">Create Account</h2>
          <p className="text-muted text-center mb-4">
            Welcome! Join us to share and discover amazing recipes 
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Name"
                value={register.name}
                onChange={(e) =>
                  setRegister({ ...register, name: e.target.value })
                }
              />
            </div>
             <div className="form-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="lastname"
                value={register.lastname}
                onChange={(e) =>
                  setRegister({ ...register, lastname: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                value={register.email}
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={register.password}
                onChange={(e) =>
                  setRegister({ ...register, password: e.target.value })
                }
              />
            </div>

            <button
              className="btn btn-success w-100 btn-lg mb-3"
              onClick={handleRegister}
              disabled={status === "pending"}
            >
              {status === "pending" ? "Loading..." : "Create Account"}
            </button>

            <div className="text-center my-3">
              <span>Or sign up with</span>
              <div className="social-icons mt-3">
                <button className="btn btn-outline-danger mx-2">
                  <i className="fab fa-google"></i> Google
                </button>
                <button className="btn btn-outline-primary mx-2">
                  <i className="fab fa-facebook-f"></i> Facebook
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              <p>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;