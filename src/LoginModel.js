import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import LoginPage from "./LoginPage";
import AppContext from './libs/contextLib';

const LoginModel = (props) => {
    const { labelsText } = useContext(AppContext);
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
                    {labelsText.sign_up_start}
                </p>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModel;