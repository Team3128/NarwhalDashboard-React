import React from 'react'
import './BasicLayoutStyles.css';

import Timer from './Components/timer.js';
import Grid from './Components/grid.js';
import Auto from './Components/auto.js';

//Props:
//left: Left component
//middle: Middle component
//right: Right component
//leftWidth: Width of left component (% of screen) (0-100)
//middleWidth: Width of middle component (% of screen) (0-100)
//rightWidth: Width of right component (% of screen) (0-100)
//hasMiddle: If true, middle component is displayed

function DashboardBase({
  left,
  middle,
  right,
  leftWidth,
  middleWidth = 0,
  rightWidth
}) {

  //Ensure sum of props.leftWidth, props.middleWidth, props.rightWidth is 100

  if(leftWidth + middleWidth + rightWidth != 100) {
    console.log("Error: Sum of leftWidth, middleWidth, rightWidth is not 100");
    console.log("leftWidth: " + leftWidth);
    console.log("middleWidth: " + middleWidth);
    console.log("rightWidth: " + rightWidth);
    return null;
  }

  return (
    <div className="flexbox row squash" style={{"alignItems": "stretch"}}>
        <div className="flexbox column squash" style={{"flex": `0 0 ${leftWidth}%`}}>
            {left}
        </div>
        

        <div className="flexbox column squash" style={{"flex":`0 0 ${middleWidth}%`}}>
            {middle}
        </div>

            <div>
                {right}
            </div>
    </div>
  );
}

export default DashboardBase;