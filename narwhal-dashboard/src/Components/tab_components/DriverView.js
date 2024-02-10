import React from 'react';

import DashboardBase from '../../DashboardBase';
import Battery from '../Battery';
import CameraView from '../CameraView';
import Field from '../Field';
import Status from '../Status'

const DriverView = (props) => {
    return <DashboardBase leftWidth = {40} middleWidth = {0} rightWidth = {60}
        left = {
            <>
            <Battery voltage = {props.dataMap.get("voltage").toFixed(2)} matchTime = {Number(props.dataMap.get("time")).toFixed(0)} robotState = {props.robotMatchState}/>
            <div
                className="flexbox column"
                style={{
                alignItems: "stretch",
                flexGrow: 0,
                margin: 25,
                marginBottom: 0,
                padding: 0,
                borderRadius: 16
                }}
            >
            </div>
            {/* <CameraView cameraName="The Camera" cameraURL="google.com"/> */}
            <div className='flexbox row'>
                <Status subsystem='swerve' connected='true'/>
                <Status subsystem='intake' connected='true'/>
                <Status subsystem='shooter' connected='true'/>
                <Status subsystem='climber' connected='true'/>
            </div>
            </>
        }
        middle = {
            <>
            </>
        }
        right = {
            <>
                <Field robotX = {props.dataMap.get("robotX")} robotY = {props.dataMap.get("robotY")} robotYaw = {props.dataMap.get("robotYaw")}/>
            </>
        }
        
        />
};

export default DriverView;