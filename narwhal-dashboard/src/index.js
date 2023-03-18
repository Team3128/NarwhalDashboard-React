// Index.js renders the page called "App.js" which is responsible for the html page and loading the componenets

import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardBase from './DashboardBase';
import Battery from './Components/BatteryMatchTime';
import AutoSelector from './Components/AutoSelector';
import CameraView from './Components/CameraView';
import Grid from './Components/Grid';
import Header from './Components/Header';
import { RobotStates } from './Components/BatteryMatchTime';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <div>

    <div id="cover" className="cover"></div>
      
    <DashboardBase leftWidth = {40} middleWidth = {30} rightWidth = {30}
      left = {
        <>
          <Battery voltage = {10} matchTime = {50} robotState = {RobotStates.TELEOP}/>
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
            <AutoSelector autoPrograms={["Auto 1", "Auto 2", "Auto 3"]}/>
          </div>
        </>
      }
      middle = {
        <CameraView cameraName="The Camera" cameraURL="google.com"/>
      }
      right = {
        <>
          <Grid/>
        </>
      }
    
    />
      
    </div>
  </React.StrictMode>
);