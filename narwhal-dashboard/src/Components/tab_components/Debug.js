import React from 'react';

import DashboardBase from '../../DashboardBase';
import Subsystem from '../Subsystem';

/**
 * Used to create a Debug tab with all subsystems and unit tests
 * 
 * How To Use: 
 * Here are the props you can pass to this component:
 * testResult: Hash map containing all the test results
 * socket: The websocket connection in App.js
 */
const Debug = (props) => {
    return <DashboardBase leftWidth = {100} middleWidth = {0} rightWidth = {0}
        left = {
            <>
            <div id="system-checks">
                <Subsystem socket = {props.socket} name = {"Intake"} testResult = {props.testResult}/>
                <Subsystem socket = {props.socket} name = {"Shooter"} testResult = {props.testResult}/>
                <Subsystem socket = {props.socket} name = {"Climber"} testResult = {props.testResult}/>
                <Subsystem socket = {props.socket} name = {"Robot"} testResult = {props.testResult}/>
            </div>
            </>
        }
        
        />
};

export default Debug;