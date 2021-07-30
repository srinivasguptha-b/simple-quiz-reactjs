import React from "react";
import { Bling as GPT } from "react-gpt";

GPT.enableSingleRequest();

const SingleAdUnit = ({ size }) => {
    return (
        <>
            {size == 'banner' ? <div id="div-gpt-ad-1501582186001-5" className="d-none d-md-block text-center">
                <GPT
                    adUnitPath="/1008496/mykhel-eng-home-728x90"
                    slotSize={[728, 90]}
                />
            </div>
                : size == 'square' ?
                    <div id="div-gpt-ad-1501582186001-0" className="text-center">
                        <GPT
                            adUnitPath="/1008496/mykhel-eng-home-300x250"
                            slotSize={[300, 250]}
                        />
                    </div> : <></>
            }
        </>
    );
}
export default SingleAdUnit;