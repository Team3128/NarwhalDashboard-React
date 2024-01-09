import React from 'react';
import {useState, useRef, useEffect} from "react";
import io, { connect } from 'socket.io-client';
import './css/Field.css';

//import var field from the field png
import field from '../assets/field.png';
import robot from '../assets/robot.png';

const Field = (props) => {
    const [pixelsPerMeter, setPixelsPerMeter] = useState(null);
    const [fieldHeight, setFieldHeight] = useState(null);
    // TODO: update to actual data
    const [robotX, setRobotX] = useState(2.44);
    const [robotY, setRobotY] = useState(4.11);
    const [robotDir, setRobotDir] = useState(45);
    useEffect(()=>{
        setPixelsPerMeter(document.getElementById('field').width / 16.4846);
        setFieldHeight(document.getElementById('field').height);
        // console.log(fieldHeight - (robotY * pixelsPerMeter) + "px");
    });
    // const robotX = 5, robotY = 2, robotDir = 45;

    // console.log("ppm: " + pixelsPerMeter);
    // console.log(robotX * pixelsPerMeter + "px");
    // console.log(robotY * pixelsPerMeter + "px");
    return(
        <>
            <img id = "field" src = {field}></img>
            <img id = "robot" src = {robot} style = {{
                position: "relative",
                width: 0.86 * pixelsPerMeter + "px",
                left: (robotX - 0.43) * pixelsPerMeter + "px",
                top: fieldHeight - ((robotY + 0.43) * pixelsPerMeter) + "px",
                transform: "rotate(" + -robotDir + "deg)"
            }}></img>
        </>
    );
}

export default Field;