import React from 'react';
import './css/BasicLayoutStyles.css';
import makeGauge from '../mins/gaugeMaker.js';

import './css/Backgrounds.css';

//import useRef and useEffect from react
import {useEffect} from 'react';


//EXPLANATION:
//This code is kind of scuffed
//The code is using a library called "canvas-gauges" to create a gauge
//This is not a React library, so its usage is a little unconventional
//We have an external script module called gaugeMaker, which in turn will call the canvas-gauges library
//The gaugeMaker module will return a gauge object, which we can use to set the value of the gauge whenever the voltage changes

//The React version of canvas-gauges (react-canvas-gauges) is not compatible with the version of React we are using
//If it gets updated, we should switch to that as it has a built-in React component for the gauge, which is much more clean
var battGauge;

const RobotStates = {
    DISABLED: {
        "name": "DISABLED",
        "classList": ["black", "blinking"]
    },
    AUTO: {
        "name": "AUTO",
        "classList": ["gold"]
    },
    TELEOP: {
        "name": "TELEOP",
        "classList": ["green"]
    },
    ENDGAME: {
        "name": "ENDGAME",
        "classList": ["red"]
    }
}

function BatteryMatchTime({voltage = 0, matchTime = 0, robotState = RobotStates.DISABLED}) {

    

    //useEffect is called after the component is rendered. This will set up the gauge object.
    //The gauge object will handle the drawing of the gauge. We are teling it where to draw the gauge and
    //setting some options on how it should look.
    useEffect(() => {
        battGauge = makeGauge('batt_gauge', 160, 0, 15, [0,3,6,9,12,15], 3, [
            {from:  0, to:  8, color: "#d60000"},
            {from:  8, to: 12, color: "#efdb00"},
            {from: 12, to: 15, color: "#41c603"}
        ], "white", "white", "#0085b2", 2, 32);

        //TODO: change size

    }, []);

    //This useEffect is called whenever the voltage prop changes. We are telling the gauge object to update the value
    //of the gauge and then draw it.
    useEffect(() => {
        battGauge.value = voltage;
        // console.log(voltage);
        battGauge.draw();
    }, [voltage])

    return (
        <div className="flexbox row white"
            style={{
                alignItems: "center",
                flexGrow: 0,
                marginRight: "25px",
                padding: "8px",
                borderRadius: "20px"   
            }}>
            <div id="battery" className="grey"
                style = {{
                    flex: "0 0 160px",
                    height: "160px",
                    borderRadius: "14px",
                    padding: "8px",
                    textAlign: "center",
                    verticalAlign: "middle"
                }}>
                <font style={{
                    fontSize: "18pt",
                    lineHeight: "12pt"
                }}>Battery</font>
                <canvas id="batt_gauge"></canvas>
            </div>

            <div style={{
                flexGrow: 1,
                textAlign: "center",
                verticalAlign: "middle"
            }}>
                    <font id="match_time" style={{
                        fontSize: "60pt",
                        lineHeight: "64pt"
                    }}>{Math.floor(matchTime / 60)+":" + (matchTime % 60).toLocaleString('en-US', {minimumIntegerDigits:2,useGrouping:false}) + "s"}</font>
                    <br/>
                    <font style={{
                        fontSize: "1.2vw",
                        lineHeight: "20pt"
                    }}>Match Time Remaining</font>
                    <br/>
                    <div id="match_state" className={robotState.classList.join(" ")+ " flexbox grey"}
                    style={{
                        alignItems: "center",
                        flexGrow: 0,
                        margin: "25px",
                        marginBottom: "0px",
                        padding: "12px",
                        borderRadius: "16px",
                        display: "inline-block"
                    }}>
                        <font id="match_state_text" className="grey" style={{
                            fontSize: "32pt",
                            fontWeight: "900"
                        }}>{robotState.name}</font>
                    </div>
            </div>
        </div>
    );
}

export {RobotStates};


export default BatteryMatchTime;