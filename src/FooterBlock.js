import React from 'react';
import { Whatsapp, Facebook, Twitter } from 'react-bootstrap-icons';
import { FacebookIcon, WhatsappIcon, TwitterIcon, FacebookShareButton, WhatsappShareButton, TwitterShareButton } from "react-share";
const FooterBlock = () => {
    return (
        <div className="" >
            <hr></hr>
            <div className="share-block d-sm-flex text-center">
                <div className="share-title">Share with your friends &nbsp;</div>
                <div className="">
                    <WhatsappShareButton
                        url={window.location.href}
                        title={document.title}
                        separator=":: "
                        className="cursor-pointer"
                    >
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>
                    &nbsp;
                    <FacebookShareButton
                        url={window.location.href}
                        quote={document.title}
                        hashtag="#ONEINDIADWContest"
                        className="cursor-pointer">
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                    &nbsp;
                    <TwitterShareButton
                        url={window.location.href}
                        title={document.title}
                        hashtags={["ONEINDIADWContest"]}
                        via="oneindia"
                        className="cursor-pointer"
                    >
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                </div>
                &nbsp;
                <div className="share-btn">
                    <button className="btn-share text-center" type="button" name="button">#ONEINDIADWContest</button>
                </div>
                <div className="conditions-text mt-2 ms-auto"><a href="#">* Terms &amp; conditions </a></div>
            </div>
        </div>
    );
}

export default FooterBlock;