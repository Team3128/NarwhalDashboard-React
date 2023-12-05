import React, { useEffect } from 'react';
import './css/Backgrounds.css';

//import useRef and useEffect from react
import {useState} from 'react';

import './css/BasicLayoutStyles.css';
import {send} from '../RobotConnection/SocketManager';

/**
 * Used to make a button that sends its state to the robot
 * Button creates a button element that has a state variable returning true when the button is pressed and
 * false when released
 * 
 * How To Use: 
 * Here are the props you can pass to this component:
 * name: The name of the button
 * socket: The websocket connection in App.js
 */
function Button(props) {
    const [state, setState] = useState(false);  //Button state

    useEffect(()=> {
        if (props.socket != null) {
            console.log("button:" + props.name + ":" + state);
            props.socket.send("button:" + props.name + ":" + (state ? "down" : "up"));
        }
    }, [state])

    return (
        //todo change this to look nice
        <button onPointerDown = {()=> setState(true)} onPointerUp = {()=> setState(false)}>
            EXAMPLE BUTTON
        </button>
    );
}

export default Button;