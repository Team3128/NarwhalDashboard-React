import React from "react";
import {useState, useRef, useEffect} from "react";
import io, { connect } from 'socket.io-client';
import config from './config.json';

import DashboardBase from './DashboardBase';
import Battery from './Components/BatteryMatchTime';
import AutoSelector from './Components/AutoSelector';
import CameraView from './Components/CameraView';
import Grid from './Components/Grid';
import Header from './Components/Header';
import { RobotStates } from './Components/BatteryMatchTime';


//TODO: Fill in the disconnected constants


//The disconnectedJson and disconnectedDebugMap define what values the page should use when the robot isn't connected.
//This ensures that the page doesn't crash when the robot is disconnected and no data is available.
const disconnectedJson = {
    "isDisconnectedFromRobot": true,
    "auto": ["Auto 1", "Auto 2"]
}

const disconnectedDebugMap = new Map();

//Populate Map
disconnectedDebugMap.set("voltage", 0);
disconnectedDebugMap.set("time", 0);

function App() {

    //This state stores the socket
    const [socket, setSocket] = useState(null);

    //This state stores whether or not the socket is currently connected
    const [socketConnected, setSocketConnected] = useState(false);

    //This state stores the most recent JSON sent by the robot
    const [jsonData, setJsonData] = useState(disconnectedJson);

    //This state stores the first JSON sent by the robot
    const [firstJsonData, setFirstJsonData] = useState(disconnectedJson);

    //This state stores the debug map, which is a map of important values that is part of the JSON. 
    //We store it separately since it's hard to access the map from the JSON directly
    const [debugMap, setDebugMap] = useState(new Map(JSON.parse(JSON.stringify(Array.from(disconnectedDebugMap)))));

    //This state stores the current match state of the robot
    const [robotMatchState, setRobotMatchState] = useState(RobotStates.DISABLED);

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

    //This code is called when the page is loaded. It creates a web socket to the robot and defines what to do
    //on the first connection, on each message, and on disconnect
    useEffect(() => {

        //If the page is closed, disconnect the socket
        return () => {
            if(socket) {
                socket.close();
            }
        }

    }, []);

    useEffect(() => {

        if(!socket) {
            return;
        }

        //Called when the code connects to the robot
        socket.onopen = () => {
            setSocketConnected(true);
            console.log("Connected");
        };

        //Called whenever the robot sends a message
        socket.onmessage = (event) => {

            let data = JSON.parse(event.data);

            console.log(data);

            //Update JSON
            setJsonData(data);

            //Update first JSON if it hasn't been set yet
            //TODO: Make this more elegant
            if(data.hasOwnProperty("auto")) {
                setFirstJsonData(data);
            }

            // if (Object.keys(firstJsonData).length === 0) {
            //     setFirstJsonData(data);
            // }

        };

        //Called on disconnect
        socket.onclose = () => {
            setSocketConnected(false);
            setFirstJsonData(disconnectedJson);
            setJsonData(disconnectedJson);
            setDebugMap(new Map(JSON.parse(JSON.stringify(Array.from(disconnectedDebugMap)))));
        };
    }, [socket]);


    useEffect(() => {
        //Retrieve Debug Map
        if(jsonData["debug"]) {
            for(const [key, value] of Object.entries(jsonData["debug"])) {
                debugMap.set(key, value);
            }
        }

        //Calculate Robot Match State
        if(debugMap.get("time") <= 0) {
            setRobotMatchState(RobotStates.DISABLED);
        }
        else if(debugMap.get("time") <= 15 && robotMatchState == RobotStates.DISABLED) {
            setRobotMatchState(RobotStates.AUTO);
        }
        else if(debugMap.get("time") <= 30) {
            setRobotMatchState(RobotStates.ENDGAME);
        }
        else if(debugMap.get("time") <= 135) {
            setRobotMatchState(RobotStates.TELEOP);
        }

        //Light Up Grid If Needed
        if(jsonData["selectedGridCell"] && gridRef.current) {
            gridRef.current.lightItem([jsonData["selectedGridCell"]["y"], jsonData["selectedGridCell"]["x"]]);
        }
    }, [jsonData]);

    return (
        <>
            <Header connect={connectToRobot} disconnect={disconnectFromRobot} connectionStatus={socketConnected}/>
            <div>

            {!socketConnected && <div id="cover" className="cover"></div>}
            
            <DashboardBase leftWidth = {40} middleWidth = {30} rightWidth = {30}
            left = {
                <>
                <Battery voltage = {debugMap.get("voltage")} matchTime = {Number(debugMap.get("time")).toFixed(0)} robotState = {robotMatchState}/>
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
                    <AutoSelector socket={socket} autoPrograms={firstJsonData['auto']}/>
                </div>
                </>
            }
            middle = {
                <CameraView cameraName="The Camera" cameraURL="google.com"/>
            }
            right = {
                <>
                <Grid ref={gridRef}/>
                </>
            }
            
            />
            
            </div>
        </>
    );

}

export default App;