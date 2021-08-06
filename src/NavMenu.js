import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LoginModel from './LoginModel';
import { BrowserView } from 'react-device-detect';
import AppContext from './libs/contextLib';
import SingleAdUnit from './SingelAdUnit';

const Navmenu = (props) => {
    const { isAuthenticated, userData, modalShow, setModalShow } = useContext(AppContext);
    return (
        <>
            <Navbar bg="light" expand="lg" className="px-2">
                <Navbar.Brand href={process.env.REACT_APP_API_BASEPATH}>
                    <img src="https://videos.oneindia.com/videos/devel/images/admin/logo.png" alt="" border="0" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav" style={{ textAlign: "right" }}>
                    <Nav className="ms-auto d-none d-md-block">
                        {!isAuthenticated ? (<>
                            <Nav.Link onClick={() => {
                                setModalShow(true);
                            }}>Login</Nav.Link>
                            <Nav.Link>
                                <BrowserView>
                                    <SingleAdUnit size="banner" />
                                </BrowserView>
                            </Nav.Link>
                        </>) : (<>
                            <NavDropdown title={
                                <span>
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
                    <Nav className="ms-auto d-block d-md-none">
                        {!isAuthenticated ? <Nav.Link onClick={() => {
                            setModalShow(true);
                        }}>Login</Nav.Link> : <>
                                <NavDropdown.Item><img style={{ width: "30px", borderRadius: "50%" }}
                                    src={userData.picture}
                                    alt="user pic"
                                /></NavDropdown.Item>
                                <NavDropdown.Item>{userData.name}</NavDropdown.Item>
                                <NavDropdown.Item onClick={props.handleLogout}>Logout</NavDropdown.Item>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
            {!isAuthenticated ? <LoginModel
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> : <></>}
        </>
    );
}

export default Navmenu;