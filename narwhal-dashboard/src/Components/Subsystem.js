import React from 'react';
import {useState} from 'react';

import Button from './Button';

import './css/Subsystem.css'

/**
 * Used to create a subsystem component with a button to instruct the robot
 * to run a test on the subsystem
 * 
 * How To Use: 
 * Here are the props you can pass to this component:
 * name: The name of the subsystem
 * testResult: The hash map containing all unit test results
 * socket: The websocket connection in App.js
 */
const Subsystem = (props) => {
    // PASS FAIL RUNNING
    const [result, setResult] = useState(props.testResult.get(props.name));
    return <>
        <div className = "display">
            <div className = {`displayBox ${result == "PASS" ? "Green" : (result == "FAIL" ? "Red" : "Yellow")}`}></div>
            <img className = "displayBox" src = {process.env.PUBLIC_URL + "/" + props.name + '.png'}></img>
        </div>
        <Button socket = {props.socket} name = {props.name} display = {"Run " + props.name + " Test"}></Button>
    </>
};

export default Subsystem;