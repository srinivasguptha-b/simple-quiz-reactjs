import React from 'react';
import { Whatsapp, Facebook, Twitter } from 'react-bootstrap-icons';
import { FacebookIcon, WhatsappIcon, TwitterIcon, FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
const FooterBlock = () => {
    let shareTitle = "Participate in #OneindiaDW Watch & Win Contest to win ₹2000 worth Amazon gift vouchers by answering a simple and interesting question.";
    return (
        <div className="" >
            <hr className="m-0"></hr>
            <div className="share-block d-sm-flex text-center">
                <div className="share-title">Share with your friends &nbsp;</div>
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
                <div className="conditions-text mt-2 ms-auto"><a href="#">* Terms &amp; conditions </a></div>
            </div>
        </div>
    );
}

export default FooterBlock;