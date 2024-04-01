import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import Helper from "../utility/Helper.jsx";
import {Link, NavLink} from "react-router-dom";
import Logo from "../assets/images/logo.svg";


const AppNavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#">
                <img src={Logo}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: '100px' }}
                  navbarScroll
              >
                <NavLink to="/" className="nav-link">Home</NavLink>
                  {
                      Helper.isLogin() && <NavLink to="/cart-list" className="nav-link">Cart List</NavLink>
                  }

              </Nav>
                {
                    Helper.isLogin() ? (
                        <Button className="btn btn-danger">Logout</Button>
                    ) : (
                        <Link className="btn btn-danger" to="/login">Login</Link>
                    )
                }

            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};

export default AppNavBar;