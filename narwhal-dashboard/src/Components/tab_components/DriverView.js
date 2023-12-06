import React from 'react';

import DashboardBase from '../../DashboardBase';
import Battery from '../BatteryMatchTime';
import AutoSelector from '../AutoSelector';
import CameraView from '../CameraView';
import GridPlacement from "../GridPlacement";
import Button from '../Button';


const DriverView = (props) => {
    return <DashboardBase leftWidth = {40} middleWidth = {30} rightWidth = {30}
        left = {
            <>
            <Battery voltage = {props.dataMap.get("voltage")} matchTime = {Number(props.dataMap.get("time")).toFixed(0)} robotState = {props.robotMatchState}/>
            <div
                className="flexbox column"
                style={{
                alignItems: "strech",
                flexGrow: 0,
                margin: 25,
                marginBottom: 0,
                padding: 0,
                borderRadius: 16
                }}
            >
            </div>
            </>
        }
        middle = {
            <>
            <CameraView cameraName="The Camera" cameraURL="google.com"/>
            </>
        }
        right = {
            <>
            <GridPlacement selectedNode = {props.dataMap.get("selectedNode")}/>
            </>
        }
        
        />
};

export default DriverView;