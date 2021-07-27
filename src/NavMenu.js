import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import AppContext from './libs/contextLib';
const Navmenu = (props) => {
    const { isAuthenticated, userData } = useContext(AppContext);
    return (
        <Navbar bg="light" expand="lg" className="px-2">
            <Navbar.Brand href={process.env.REACT_APP_API_BASEPATH}>
                <img src="https://videos.oneindia.com/videos/devel/images/admin/logo.png" alt="" border="0" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav" className="pe-3">
                <Nav className="ms-auto">
                    {!isAuthenticated ? (<Nav.Link href={process.env.REACT_APP_API_BASEPATH + "Login"}>Login</Nav.Link>) : (<>
                        <NavDropdown title={
                            <span className="pull-left">
                                <img style={{ width: "30px", borderRadius: "50%" }}
                                    src={userData.picture}
                                    alt="user pic"
                                />
                            </span>
                        } id="basic-nav-dropdown">
                            <NavDropdown.Item>{userData.name}</NavDropdown.Item>
                            <NavDropdown.Item onClick={props.handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>

                    </>)}

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );
}

export default Navmenu;