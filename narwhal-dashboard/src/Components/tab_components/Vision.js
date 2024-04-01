import React from 'react';

import DashboardBase from '../../DashboardBase';
import "../css/Vision.css";

import {useState} from 'react';
import {useEffect} from 'react';

//https://docs.photonvision.org/en/latest/docs/installation/networking.html
const Vision = (props) => {
    const [camURL, setCamURL] = useState("none");
    const [camName, setCamName] = useState("No Cams");

    const handleCamChange = (newURL, newCamName) => {
        setCamURL(newURL);
        setCamName(newCamName);
    }

    return (
        <DashboardBase leftWidth = {30} middleWidth = {0} rightWidth = {70}
        left = {
            <div class = "vision-holder"> 
                <div id="vision-title"> CAMS </div>
                <button className = "button"  id="camera-view" onClick={() => {handleCamChange("1", "Front Left")}}> Front Left </button>
                <button className = "button"  id="camera-view" onClick={() => {handleCamChange("2", "Front Right")}}> Front Right </button>
                <button className = "button"  id="camera-view" onClick={() => {handleCamChange("3", "Left")}}> Left </button>
                <button className = "button"  id="camera-view" onClick={() => {handleCamChange("4", "Right")}}> Right </button>
                <button className = "button"  id="camera-view" onClick={() => {handleCamChange("5", "LimeLight")}}> LimeLight </button>
                <button className = "button"  id="camera-view" onClick={() => {handleCamChange("none", "No Cams")}}> No Cams </button>
            </div>
        }
        right = {
            <div class = "cam-feed">
                <div id = "cam-title">{camName}</div>
                <img src={camURL} id="active-feed"/>
            </div>
        }
        />
    );
}

export default Vision;