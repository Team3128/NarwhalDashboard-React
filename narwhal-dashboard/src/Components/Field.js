import React from 'react';
import {useState, useRef, useEffect} from "react";
import io, { connect } from 'socket.io-client';
import './css/Field.css';

//import var field from the field png
import field from '../assets/field.png';
import robot from '../assets/robot.png';

const Field = (props) => {
    const [pixelsPerMeter, setPixelsPerMeter] = useState(null);
    useEffect(()=>{
        setPixelsPerMeter(document.getElementById('field').width / 16.4846);
    });

    console.log("ppm: " + pixelsPerMeter);
    return(
        <>
            <img id = "field" src = {field}></img>
            <img id = "robot" src = {robot} style = {{
                width: 0.86 / pixelsPerMeter
            }}></img>
        </>
    );
}

export default Field;