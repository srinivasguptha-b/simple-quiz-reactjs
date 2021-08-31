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
                    <b>CONTEST NAME: OneindiaDW - Watch & Win Contest</b><br></br>
                    <b>ABOUT THE CONTEST:</b> Duration – Sep 2nd, 2021 12:00:00 AM to Oct 3rd 2021 11:59:59 PM
                    <br></br>
                    <b>WINNER SELECTION</b>
                    <p>50 lucky participants will be selected by a random draw of lots from the participants.
                    One participant selected as per the contest T&Cs, will qualify as contest winner and be eligible to receive the prize of ‘Rs.2000 Amazon Gift Card’ (only if they comply with the T&Cs of the contest).
                    One participant will be eligible to win the contest only once in the entire contest duration.
                    The winners, if eligible, will receive the prize (as Amazon Gift Card) before Oct 10, 2021.</p>
                    <b>CONTEST TERMS AND CONDITIONS</b><br></br>
                    <p>This ‘Watch & Win’ contest ("Contest") is provided to you by Deutsche Welle and made available on www.oneindia.com by Greynium Information Technologies Pvt Ltd</p>

                    <p>Please read these terms and conditions ("T&Cs") before entering the Contest. You agree that, by participating in this Contest, you will be bound by these T&Cs and you acknowledge that you satisfy all Contest eligibility requirements as provided here.</p>


                    <b>DETAILS OF THE CONTEST AND HOW TO ENTER:</b><br></br>

                    <p>In order to participate in the Contest, a person must land on to the website, Login with Google, watch the video and answer the question. Correctly answered participants will be selected for a lucky draw and winners will be announced at the end of contest period. Winners will receive the mail which is used while participating the contest.</p>


                    <p>A total of 50 Participants will be selected to be eligible for the Prize during the Contest Period and Amazon vouchers will be mailed on the same registered mail ID.</p>

                    <p>Each Participant will be eligible to receive maximum of only one Prize under this Contest. A Participant announced as winner for one contest will not be eligible to participate in the remaining contest.</p>

                    <b>MAILING LIST:</b><br></br>
                    <p>By entering the Contest, you consent to being placed on a mailing list for promotional and other materials for Oneindia. You may update or change your email preferences at the email preferences page.</p>


                    <b>PRIZES:</b><br></br>
                    <p>There is a total of 50 participants who will be selected under this Contest and will qualify as winner to receive Rs.2000 Amazon voucher.</p>

                    <b>RESULT ANNOUNCEMENTS:</b><br></br>
                    <p>Names of the Selected Participants will be published on the Contest page at the end of each contest. We will also notify the selected Participants by e-mail by end of the contest. The selected Participants may forfeit their claim to the Prize if they do not meet the eligibility criteria or do not comply with these T&C’s.</p>

                    <b>PRIZE DRAWING:</b><br></br>
                    <p>The drawing for selection of the winners of the Contest will be done on Oct 4th, We will notify the selected Participants by e-mail AND/OR SMS following the draw latest by 4th Oct, and they will be required to answer a simple question and share a valid proof of identity and age in the form of a copy of PAN Card / Driving License / Voter ID / Indian passport or other documentation required under terms and conditions.</p>

                    <p>The selected Participant will also be required to prove his/her age and residence proof, failing which he/she will be disqualified from the Contest. The selected Participants need to respond to the email within 7 working days from receiving the email with the above requested information and documents.</p>

                    <p>The selected Participants will automatically forfeit their claim to the Prize if they do not meet the eligibility criteria or do not comply with these T&Cs.</p>

                    <p>There are no cash or other prize alternatives available in whole or in part. If any selected Participant does not respond back to any communications sent in relation to the Contest within the time period communicated by Oneindia, he/she shall not be eligible to be declared winner of the Prize. In such case, an alternate winner may not be selected.</p>

                    <b>ADDITIONAL TERMS:</b><br></br>
                    <p>Greynium Information Technologies Pvt Ltd may, to the maximum extent permitted by applicable law and in our sole discretion, change the T&Cs or cancel the Contest at any time; or modify, terminate, or suspend the Contest should viruses, worms, bugs, unauthorized human intervention or other causes beyond our control corrupt or impair the administration, security, fairness or proper play of the Contest or submission of entries.</p>

                    <p>We are not responsible for: (a) lost, misdirected, late, incomplete, or unintelligible entries or for inaccurate entry information, whether caused by you or by any of the equipment or programming associated with or utilized in the Contest, or by any technical or human error that may occur in the processing of entries; (b) any printing or typographical errors in any materials associated with the Contest; (c) any error in the operation or transmission, theft, destruction, unauthorized access to, or alteration of, entries, or for technical, network, telephone, computer, hardware or software, malfunctions of any kind, or inaccurate transmission of, or failure to receive any entry information on account of technical problems or traffic congestion on the Internet or at any website; or (d) injury or damage to your or any other computer or mobile resulting from downloading any materials in connection with the Contest.</p>

                    <p>Greynium Information Technologies Pvt Ltd may, in its sole discretion, disqualify any individual found to be: (a) tampering with the entry process or the operation of the Contest or website; (b) acting in violation of these T&Cs; or (c) acting in an unsportsmanlike or disruptive manner or with intent to annoy, abuse, threaten or harass any other person.</p>

                    <p>If your entry is incomplete or if you use robotic, automatic, programmed or similar entry methods, your entry will be void. The authorized subscriber of the e-mail account used to enter the Contest at the actual time of entry will be deemed to be the participant and must comply with these T&Cs in the event of a dispute as to entries submitted by multiple users having the same e-mail account.</p>


                    <b>MISCELLANEOUS:</b><br></br>
                    <p>The Contest is governed by the laws of the Republic of India. All rights reserved. No requests for transfer or assignment or redemption of the benefits shall be entertained. You agree that all Greynium Information Technologies Pvt Ltd decisions related to the Contest are final and binding on you.</p>


                    <b>SPONSOR:</b><br></br>
                    <p>The sponsor of this Contest is Deutsche Welle.</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default FooterBlock;