import React from "react";
import {useState, useRef, useEffect} from "react";
import io, { connect } from 'socket.io-client';
import config from './config.json';

import DashboardBase from './DashboardBase';
import Battery from './Components/BatteryMatchTime';
import AutoSelector from './Components/AutoSelector';
import CameraView from './Components/CameraView';
import GridPlacement from "./Components/GridPlacement";
import Header from './Components/Header';
import { RobotStates } from './Components/BatteryMatchTime';
import Button from "./Components/Button";
import Tabs from "./Components/tab_components/Tabs";
import {activeTab} from "./Components/tab_components/Tabs"



//TODO: Fill in the disconnected constants


//The disconnectedJson and disconnectedDebugMap define what values the page should use when the robot isn't connected.
//This ensures that the page doesn't crash when the robot is disconnected and no data is available.
const disconnectedJson = {
    "isDisconnectedFromRobot": true,
    "auto": []
}
const disconnectedDataMap = new Map();

disconnectedDataMap.set("voltage", 0);
disconnectedDataMap.set("time", 0);
disconnectedDataMap.set("auto", ["Test"]);
disconnectedDataMap.set("selectedNode", -1);

function App() {

    //This state stores the socket
    const [socket, setSocket] = useState(null);

    //This state stores whether or not the socket is currently connected
    const [socketConnected, setSocketConnected] = useState(false);

    //This state stores the most recent JSON sent by the robot
    const [jsonData, setJsonData] = useState(disconnectedJson);

    //Map to store messages from java side
    const [dataMap, setDataMap] = useState(new Map(JSON.parse(JSON.stringify(Array.from(disconnectedDataMap)))));

    //This state stores the current match state of the robot
    const [robotMatchState, setRobotMatchState] = useState(RobotStates.DISABLED);

    const [activeTab, setActiveTab] = useState("driverView");

    const handleTabDriverView = () => {
        setActiveTab("driverView")
    };
    const handleTabAuto = () => {
        setActiveTab("auto")
    };
    const handleTabDebug = () => {
        setActiveTab("debug")
    }

    //Todo move this into the dataMap
    const gridRef = useRef(null);


    const connectToRobot = () => {
        //Connect to the web socket
        setSocket(new WebSocket(config.robotIp));
    };

    const disconnectFromRobot = () => {
        if(socket) {
            socket.close();
        }
    }

    useEffect(() => {

        if(!socket) {
            return;
        }

        //Called when the code connects to the robot
        socket.onopen = () => {
            setSocketConnected(true);
            console.log("Connected");
        };

        //Called whenever the robot sends a message - get json
        socket.onmessage = (event) => {

            const data = JSON.parse(event.data);

            // console.log(data);

            setJsonData(data);
        }
        
        //Called on disconnect
        socket.onclose = () => {
            setSocketConnected(false);
            setDataMap(new Map(JSON.parse(JSON.stringify(Array.from(disconnectedDataMap)))));
        };
    }, [socket]);

    useEffect(()=> {
        //Update JSON
        for (const item of Object.keys(jsonData)) {
            dataMap.set(item, jsonData[item])
        }
    
        //Calculate Robot Match State
        if(dataMap.get("time") <= 0) {
            setRobotMatchState(RobotStates.DISABLED);
        }
        else if(dataMap.get("time") <= 15 && robotMatchState == RobotStates.DISABLED) {
            setRobotMatchState(RobotStates.AUTO);
        }
        else if(dataMap.get("time") <= 30) {
            setRobotMatchState(RobotStates.ENDGAME);
        }
        else if(dataMap.get("time") <= 135) {
            setRobotMatchState(RobotStates.TELEOP);
        }
    
        // console.log(dataMap);
    }, [jsonData]);

    return (
        <>
            <Header connect={connectToRobot} disconnect={disconnectFromRobot} connectionStatus={socketConnected}/>
            <div>


            {!socketConnected && <div id="cover" className="cover"></div>}

            <div><Tabs driverView = {handleTabDriverView} auto = {handleTabAuto} debug = {handleTabDebug}/></div>
            
            {(activeTab == "driverView") &&
                (<DashboardBase leftWidth = {40} middleWidth = {30} rightWidth = {30}
                    left = {
                        <>
                        <Battery voltage = {dataMap.get("voltage")} matchTime = {Number(dataMap.get("time")).toFixed(0)} robotState = {robotMatchState}/>
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
                            <AutoSelector socket={socket} autoPrograms={dataMap.get('auto')}/>
                        </div>
                        </>
                    }
                    middle = {
                        <>
                        <CameraView cameraName="The Camera" cameraURL="google.com"/>
                        <Button socket = {socket} name = {"Example"}/>
                        </>
                    }
                    right = {
                        <>
                        <GridPlacement selectedNode = {dataMap.get("selectedNode")}/>
                        </>
                    }
                    
                    />)
            }
            
            </div>
        </>
    );

}


export default App;