import React from 'react';

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
    // console.log("result: " + result);
    // setResult("PASS");
    return <>
    <div className = "debug">
        <div className = "display">
            <div className = {`displayBox ${props.testResult.get(props.name) === "PASS" ? "Green" : (props.testResult.get(props.name) === "FAIL" ? "Red" : "Yellow")}`}></div>
            <img id = "sub-img" className = "displayBox sub" src = {process.env.PUBLIC_URL + "/subsystem_imgs/" + props.name + '.jpg'}></img>
            <Button className="pacific dark-mode" socket = {props.socket} name = {props.name} display = {"Run " + props.name + " Test"}></Button>
        </div>
    </div>
    </>
};

export default Subsystem;