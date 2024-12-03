import React from 'react';
import {useState, useEffect} from "react";
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
        const field = document.getElementById('field'); 
        if (field === null) return;
        setPixelsPerMeter(field.width / 16.4846);
        setFieldHeight(field.height);
        // console.log(fieldHeight - (props.robotY * pixelsPerMeter) + "px");
      }, [document.getElementById('field')]);
    });

    return(
        <>
            <img id = "field" src = {field}></img>
            <p style ={{
                marginTop: "400px"
            }}>
                ({props.robotX} m, {props.robotY} m, {props.robotYaw} deg)
            </p>
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