import React from "react";
import {useState, useRef, useEffect} from "react";
import io, { connect } from 'socket.io-client';
import config from './config.json';
import './App.css';

import DashboardBase from './DashboardBase';
import Battery from './Components/Battery';
import AutoSelector from './Components/AutoSelector';
import CameraView from './Components/CameraView';
import Header from './Components/Header';
import { RobotStates } from './Components/Battery';
import Button from "./Components/Button";
import Tabs from "./Components/tab_components/Tabs";
import {activeTab} from "./Components/tab_components/Tabs"
import DriverView from "./Components/tab_components/DriverView";
import AutoSelect from "./Components/tab_components/AutoSelect";
import Debug from "./Components/tab_components/Debug"



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
disconnectedDataMap.set("robotX", 0);
disconnectedDataMap.set("robotY", 0);
disconnectedDataMap.set("robotYaw", 0);

function updateDarkMode(className, add) {
    let elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        if (add) elements[i].classList.add('dark-mode');
        else elements[i].classList.remove('dark-mode');
    }
}

function App() {

    //This state stores the socket
    const [socket, setSocket] = useState(null);

    //This state stores whether Dark Mode is enabled
    const [darkMode, setDarkMode] = useState(false);

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
    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode);
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

    useEffect(()=>{
        updateDarkMode('navy', darkMode);
        updateDarkMode('white', darkMode);
        updateDarkMode('royal', darkMode);
        updateDarkMode('sapphire', darkMode);
        updateDarkMode('pacific', darkMode);
        updateDarkMode('grey', darkMode);
        updateDarkMode('flexRowTabs', darkMode);
        updateDarkMode('debug', darkMode);
        updateDarkMode('released', darkMode);
        updateDarkMode('pressed', darkMode);
        updateDarkMode('showBackground', darkMode);
        if (darkMode) {
            document.body.classList.add('dark-mode');

        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode, activeTab]);

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
    
    }, [jsonData]);
    return (
        <div id = "base">
            <Header connect={connectToRobot} disconnect={disconnectFromRobot} connectionStatus={socketConnected}/>


            {!socketConnected && <div id="cover" className="cover"></div>}

            <div><Tabs driverView = {handleTabDriverView} auto = {handleTabAuto} debug = {handleTabDebug}/></div>
            
            {(activeTab === "driverView") && (<DriverView dataMap = {dataMap} robotMatchState = {robotMatchState} socket = {socket}/>)}

            {(activeTab === "auto") && <AutoSelect  dataMap = {dataMap} socket = {socket}/>}
            
            {(activeTab === "debug") && <Debug socket = {socket} testResult = {dataMap}/>}

            <div id = "toggle">
                <input type="checkbox" id="darkmode-toggle" onChange={toggleDarkMode}/>
                <label for="darkmode-toggle">
                </label>
            </div>
            </div>
    );

}


export default App;