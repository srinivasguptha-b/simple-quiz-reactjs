import React, { useContext } from 'react';
import AppContext from './libs/contextLib';
import { Power } from 'react-bootstrap-icons';
const WelcomeText = (props) => {
    const { isAuthenticated, userData, handleLogout, labelsText } = useContext(AppContext);
    const NameDisp = (props) => {
        return (<>
            {props.isAuthenticated ? <div className="pt-3">
                <div>
                    <b> {props.resultType === "" ? "Welcome" : "Hi"} {props.userData.name}</b> &nbsp;&nbsp;
            </div>
                <div>
                    ({props.userData.email})
            </div>
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

                        {!props.resultData.winner.length > 0 ? <div className="winner-date-title">{props.resultData.result_date ? labelsText.check_winner_on.replace('DATE', props.resultData.result_date) : ""}</div> : <div className="d-flex flex-row justify-content-between px-2">
                            {props.resultData.winner.map((win, i) => <div>
                                <div>Winner {i + 1}</div>
                                <div className="winner-photo"><img src={win.image ? win.image : process.env.PUBLIC_URL + '/user.jpeg'} alt="" /></div>
                                <div className="winner-name">{win.name}</div>
                            </div>)}
                        </div>}
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