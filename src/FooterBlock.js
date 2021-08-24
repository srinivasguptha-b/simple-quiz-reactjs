import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FacebookIcon, WhatsappIcon, TwitterIcon, FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
import AppContext from './libs/contextLib';

const FooterBlock = () => {
    const [showterm, setShowterm] = useState(false);
    const handleClose = () => setShowterm(false);
    const handleShow = () => setShowterm(true);
    const { labelsText } = useContext(AppContext);
    let shareTitle = "Participate in #OneindiaDW Watch & Win Contest to win ₹2000 worth Amazon gift vouchers by answering a simple and interesting question.";
    return (
        <>
            <div className="" >
                <hr className="m-0"></hr>
                <div className="share-block d-sm-flex text-center">
                    <div className="share-title">{labelsText.share_with_frds} &nbsp;</div>
                    <div className="">
                        <WhatsappShareButton
                            url={window.location.href}
                            title={shareTitle}
                            separator=":: "
                            className="cursor-pointer"
                        >
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>
                    &nbsp;
                    <FacebookShareButton
                            url={window.location.href}
                            quote={shareTitle}
                            hashtag="#ONEINDIADWContest"
                            className="cursor-pointer">
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                    &nbsp;
                    <TwitterShareButton
                            url={window.location.href}
                            title={shareTitle}
                            hashtags={["ONEINDIADWContest"]}
                            via="oneindia"
                            className="cursor-pointer"
                        >
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                    </div>
                &nbsp;
                <div className="share-btn">
                        <div className="btn-share text-center">#ONEINDIADWContest</div>
                    </div>
                    <div className="conditions-text mt-2 ms-auto">
                        <a href="javascript:void(0)" onClick={handleShow} >* Terms &amp; conditions </a></div>
                </div>
            </div>
            <Modal show={showterm} onHide={handleClose} size="lg">
                <Modal.Header>
                    <Modal.Title>Terms &amp; Conditions</Modal.Title>
                    <button onClick={handleClose} className="btn btn-link text-decoration-none text-dark">x</button>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                        commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                        ipsam atque a dolores quisquam quisquam adipisci possimus
                        laboriosam.
                    </p>
                    <p>
                        Quibusdam facilis doloribus debitis! Sit quasi quod
                        accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                        reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                        deleniti rem!
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FooterBlock;