import React from 'react';
import {useState, useRef, useEffect} from "react";
import io, { connect } from 'socket.io-client';
import './css/Field.css';

//import var field from the field png
import field from '../assets/field.png';
import robot from '../assets/robot.png';

const robotWidth = 0.86;

const Field = (props) => {
    const [pixelsPerMeter, setPixelsPerMeter] = useState(null);
    const [fieldHeight, setFieldHeight] = useState(null);
    // TODO: update to actual data
    useEffect(()=>{ setTimeout(() => { 
        setPixelsPerMeter(document.getElementById('field').width / 16.4846);
        setFieldHeight(document.getElementById('field').height);
        console.log(fieldHeight - (props.robotY * pixelsPerMeter) + "px");
      }, [document.getElementById('field')]);
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
                width: robotWidth * pixelsPerMeter + "px",
                left: (props.robotX - robotWidth / 2) * pixelsPerMeter + "px",
                top: fieldHeight - ((props.robotY + robotWidth / 2) * pixelsPerMeter) + "px",
                transform: "rotate(" + - props.robotYaw + "deg)"
            }}></img>
        </>
    );
}

export default Field;