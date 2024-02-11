import React from 'react'
import './css/Status.css'
import Button from './Button'

function Status(props) {
    // const subsystems = ['Swerve', 'Intake', 'Shooter', 'Climber'];
    const subsystem = props.subsystem;
    const connected = props.connected;
    return <>
        <div className={`statusDisplay ${props.connected === 'RUNNING' ? "statusGreen" : (props.connected == 'PARTIALLY_RUNNING' ? "statusYellow" : "statusRed")}`}>
            <h3 style={{color:'white'}}>{subsystem}</h3>
        </div>
    </>
}

export default Status;