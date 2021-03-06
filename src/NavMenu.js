import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LoginModel from './LoginModel';
import { BrowserView } from 'react-device-detect';
import AppContext from './libs/contextLib';
import SingleAdUnit from './SingelAdUnit';


const Navmenu = () => {
    const { isAuthenticated, modalShow, setModalShow } = useContext(AppContext);
    return (
        <>
            <Navbar expand="lg" className="px-2">
                <Navbar.Brand href={process.env.REACT_APP_API_BASEPATH + 'dwquiz/'}>
                    <img src={process.env.PUBLIC_URL + '/oi-logo.png'} alt="" border="0" />
                </Navbar.Brand>
                <Nav.Link className="ms-auto">
                    <BrowserView>
                        <SingleAdUnit size="banner" />
                    </BrowserView>
                </Nav.Link>
                <Navbar.Text className="ms-auto mb-2 mb-lg-0">
                    <img src={process.env.PUBLIC_URL + '/DW-dark-blue-RGB.png'} alt="DW" border="0" id="dwlogo" />
                </Navbar.Text>
            </Navbar >
            {!isAuthenticated ? <LoginModel
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> : <></>}
        </>
    );
}

export default Navmenu;