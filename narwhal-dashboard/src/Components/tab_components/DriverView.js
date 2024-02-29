import React from 'react';

import DashboardBase from '../../DashboardBase';
import Battery from '../Battery';
import CameraView from '../CameraView';
import Field from '../Field';
import StatusChecks from '../StatusChecks';

const DriverView = (props) => {
    return <DashboardBase leftWidth = {40} middleWidth = {0} rightWidth = {60}
        left = {
            <>
            <Battery voltage = {props.dataMap.get("voltage").toFixed(2)} matchTime = {Number(props.dataMap.get("time")).toFixed(0)}/>
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
            <StatusChecks 
                mod0 = {props.dataMap.get('Module0')}
                mod1 = {props.dataMap.get('Module1')}
                mod2 = {props.dataMap.get('Module2')}
                mod3 = {props.dataMap.get('Module3')}

                intake = {props.dataMap.get('IntakeState')}
                climber = {props.dataMap.get('ClimberState')}
                shooter = {props.dataMap.get('ShooterState')}
            />
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