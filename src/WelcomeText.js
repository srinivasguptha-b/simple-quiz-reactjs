import React, { useContext } from 'react';
import AppContext from './libs/contextLib';
import { Power } from 'react-bootstrap-icons';
const WelcomeText = (props) => {
    const { isAuthenticated, userData, handleLogout } = useContext(AppContext);
    const NameDisp = (props) => {
        return (<>
            {props.isAuthenticated ? <div className="pt-3"> <b> {props.resultType === "success" ? "Welcome" : "Hi"} {props.userData.name}</b> &nbsp;&nbsp;
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
            <div><button className="btn1" type="button" name="button">Watch &amp; Win Contest</button></div>
            {!props.resultType || props.resultType == '' ? <><NameDisp isAuthenticated={isAuthenticated} handleLogout={handleLogout} userData={userData} /> <div className="contest-btm-text p-0 pt-1">Enter the lucky draw to win Amazon voucher by answering the question correctly</div></>
                : props.resultType == 'success' ? <>
                    <div className="winner-toy pt-4">
                        <img src={process.env.PUBLIC_URL + '/toy.png'} alt="" />
                    </div>
                    <NameDisp {...props} isAuthenticated={isAuthenticated} handleLogout={handleLogout} userData={userData} />
                    <div className="contest-btm-text p-0 pt-1">Congratulation, that's right "You have entered the lucky draw to win"</div>
                    <div className="winner-date">{props.resultDate ? "Check winner on " + props.resultDate : ""}</div>
                    <div className="win-gift-msg">winner will resolve Rs 2000 amazon gift card from #ONEINDIA DW on their registers mail Id's</div>
                </> : <>
                        <div className="winner-toy pt-2">
                            <img src={process.env.PUBLIC_URL + '/wrong.png'} alt="" />
                        </div>
                        <NameDisp isAuthenticated={isAuthenticated} handleLogout={handleLogout} userData={userData} />
                        <div className="contest-btm-text p-0 pt-1">Sorry, wrong answer! Thanks for participating</div>
                    </>
            }

        </>
    );
}
export default WelcomeText;