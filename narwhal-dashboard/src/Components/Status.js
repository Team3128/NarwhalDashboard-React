import React from 'react'
import './css/Status.css'
import Button from './Button'

function Status(props) {
    // const subsystems = ['Swerve', 'Intake', 'Shooter', 'Climber'];
    const subsystem = props.subsystem;
    const connected = props.connected;
    return <>
        <div className={`statusDisplay ${props.connected === 'true' ? "statusGreen" : "statusRed"}`}>
            <h2>{subsystem}</h2>
        </div>
    </>
}

export default Status;