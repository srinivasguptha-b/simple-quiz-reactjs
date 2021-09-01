import React, { useContext } from 'react';
import AppContext from './libs/contextLib';
import { Power } from 'react-bootstrap-icons';
const WelcomeText = (props) => {
    const { isAuthenticated, userData, handleLogout, labelsText } = useContext(AppContext);
    const NameDisp = (props) => {
        return (<>
            {props.isAuthenticated ? <div className="pt-3"> <b> {props.resultType === "" ? "Welcome" : "Hi"} {props.userData.name} ({props.userData.email})</b> &nbsp;&nbsp;
                {/* <Power
                    size={20}
                    color="red"
                    onClick={props.handleLogout}
                    style={{ cursor: "pointer" }}
                /> */}
            </div> : <></>}
        </>);
    }
    return (
        <>
            <div><div className="btn1 m-auto">Watch &amp; Win Contest</div></div>
            {!props.resultType || props.resultType == '' ? <><NameDisp isAuthenticated={isAuthenticated} handleLogout={handleLogout} userData={userData} /> <div className="contest-btm-text p-0 pt-1">{labelsText.enter_the_lucky_draw}</div></>
                : props.resultType == 'success' ? <>
                    <div className="winner-toy pt-4">
                        <img src={process.env.PUBLIC_URL + '/toy.png'} alt="" />
                    </div>
                    <NameDisp {...props} isAuthenticated={isAuthenticated} handleLogout={handleLogout} userData={userData} />
                    <div className="contest-btm-text p-0 pt-1">{labelsText.congrats_text}</div>
                    <div className="winner-date">

                        {!props.resultData.winner.name ? <div className="winner-date-title">{props.resultData.result_date ? labelsText.check_winner_on.replace('DATE', props.resultData.result_date) : ""}</div> : <>
                            <div>Winner</div>
                            <div className="winner-photo"><img src={props.resultData.winner.image ? props.resultData.winner.image : process.env.PUBLIC_URL + '/user.jpeg'} alt="" /></div>
                            <div className="winner-name">{props.resultData.winner.name}</div>
                            <div className="winner-date-title">{props.resultData.result_date}</div>
                        </>}
                    </div>
                    <div className="win-gift-msg">{labelsText.winner_text}</div>
                </> : <>
                        <div className="winner-toy pt-2">
                            <img src={process.env.PUBLIC_URL + '/wrong.png'} alt="" />
                        </div>
                        <NameDisp isAuthenticated={isAuthenticated} handleLogout={handleLogout} userData={userData} />
                        <div className="contest-btm-text p-0 pt-1">{labelsText.sorry_wrong_ans}</div>
                    </>
            }

        </>
    );
}
export default WelcomeText;