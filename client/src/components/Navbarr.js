import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { logout as logoutAction } from "../JS/userSlice/UserSlice"; 
import "./Navbarr.css";



function Navbarr() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutAction());  
    navigate("/login");         
  };
  return (
    <Navbar expand="lg" className="navi px-4 py-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="images/image.png" alt="Logo" className="nav-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 nav-links" navbarScroll>
            {!user ? (
              // Utilisateur non connecté
              <>
                <Nav.Link as={Link} to="/login">Sign In</Nav.Link>
                <Nav.Link as={Link} to="/">Sign Up</Nav.Link>
              </>
            ) : user.role === "admin" ? (
              // Utilisateur admin
              <>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout} style={{cursor:"pointer"}}>Logout</Nav.Link>
              </>
            ) : (
              // Utilisateur simple
              <>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/profil">Profil</Nav.Link>
                <Nav.Link as={Link} to="/addrecipe">Add Recipe</Nav.Link>
                <Nav.Link onClick={handleLogout} style={{cursor:"pointer"}}>Logout</Nav.Link>
              </>
            )}
          </Nav>

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
