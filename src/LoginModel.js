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
                <p className="text-center text-secondary">
                    Sign up and start answering the question. (Gift card will be sent to this Google mail ID)
                 </p>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModel;