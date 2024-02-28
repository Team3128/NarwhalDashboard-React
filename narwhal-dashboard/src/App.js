import React from "react";
import {useState, useEffect} from "react";
import config from './config.json';
import './App.css';

import Header from './Components/Header';
import Tabs from "./Components/tab_components/Tabs";
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

function App() {

    //This state stores the socket
    const [socket, setSocket] = useState(null);

    //This state stores whether or not the socket is currently connected
    const [socketConnected, setSocketConnected] = useState(false);

    //This state stores the most recent JSON sent by the robot
    const [jsonData, setJsonData] = useState(disconnectedJson);

    //Map to store messages from java side
    const [dataMap, setDataMap] = useState(new Map(JSON.parse(JSON.stringify(Array.from(disconnectedDataMap)))));

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
            if (item == "Message") {
                console.log(jsonData[item]);
                continue;
            }
            dataMap.set(item, jsonData[item])
        }
    }, [jsonData]);
    return (
        <div id = "base">
            <Header connect={connectToRobot} disconnect={disconnectFromRobot} connectionStatus={socketConnected} activeTab={activeTab}/>

            {!socketConnected && <div id="cover" className="cover"></div>}

            <div><Tabs driverView = {handleTabDriverView} auto = {handleTabAuto} debug = {handleTabDebug}/></div>
            
            {(activeTab === "driverView") && (<DriverView dataMap = {dataMap} socket = {socket}/>)}

            {(activeTab === "auto") && <AutoSelect  dataMap = {dataMap} socket = {socket}/>}
            
            {(activeTab === "debug") && <Debug socket = {socket} testResult = {dataMap}/>}

            </div>
    );

}


export default App;