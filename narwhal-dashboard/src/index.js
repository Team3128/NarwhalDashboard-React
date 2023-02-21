// Index.js renders the page called "App.js" which is responsible for the html page and loading the componenets

import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardBase from './DashboardBase';
import Battery from './Components/BatteryMatchTime';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DashboardBase leftWidth = {50} middleWidth = {25} rightWidth = {25}  />
  </React.StrictMode>
);