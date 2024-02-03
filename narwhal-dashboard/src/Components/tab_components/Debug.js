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
    return <DashboardBase leftWidth = {45} middleWidth = {10} rightWidth = {45}
        left = {
            <>
            <div className='side'>
                <Subsystem socket = {props.socket} name = {"Intake"} testResult = {props.testResult}/>
                <Subsystem socket = {props.socket} name = {"Shooter"} testResult = {props.testResult}/>
            </div>
            </>
        }
        right = {
            <>
            <div className='side'>
                <Subsystem socket = {props.socket} name = {"Manipulator"} testResult = {props.testResult}/>
                <Subsystem socket = {props.socket} name = {"Elevator"} testResult = {props.testResult}/>
            </div>
            </>
        }
        
        />
};

export default Debug;