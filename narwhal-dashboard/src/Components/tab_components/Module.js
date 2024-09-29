import React from 'react';

import DashboardBase from '../../DashboardBase';
import Battery from '../Battery';
import Field from '../Field';
import StatusChecks from '../StatusChecks';

const Module = (props) => {
    // return <DashboardBase leftWidth = {100} middleWidth = {0} rightWidth = {0}
    return (
      <DashboardBase leftWidth = {100} middleWidth = {0} rightWidth = {0}
      left = {
<div class = "module-holder">
    <div id="current-title">Current</div>
    <input type="number" id="1" name="Current Limit" min="1" max="500"></input>
    <button className = "button"  id="60"> Set To 60 </button>
    <button className = "button"  id="40"> Set To 40 </button>


</div>
      } 
       />
    );
}

export default Module;