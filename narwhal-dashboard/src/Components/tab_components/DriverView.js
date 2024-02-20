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
            <div className = 'flexbox row'>
                <div className='flexbox column' 
                    style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '5px',
                        width: '50%'
                    }}
                >
                    <div className='flexbox row'>
                        <Status subsystem='Module 0' connected={props.dataMap.get('Module0')}/>
                        <Status subsystem='Module 1' connected={props.dataMap.get('Module1')}/>
                    </div>
                    <div className='flexbox row'>
                        <Status subsystem='Module 2' connected={props.dataMap.get('Module2')}/>
                        <Status subsystem='Module 3' connected={props.dataMap.get('Module3')}/>
                    </div>
                </div>
                <div style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '5px',
                        width: '25%'
                    }}>
                    <Status subsystem='Intake' connected={props.dataMap.get('Intake')}></Status>
                </div>
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