import React from 'react';
import { Modal } from 'react-bootstrap';
import LoginPage from "./LoginPage";

const LoginModel = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="p-4">
                    <LoginPage />
                </div>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                 </p>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModel;