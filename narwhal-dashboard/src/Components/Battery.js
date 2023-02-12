import React from 'react';
import '../BasicLayoutStyles.css';
import RadialGauge from 'canvas-gauges';
import makeGauge from '../mins/gaugeMaker.js';

//import useRef and useEffect from react
import {useRef, useEffect} from 'react';


//EXPLANATION:
//This code is kind of scuffed
//The code is using a library called "canvas-gauges" to create a gauge
//This is not a React library, so its usage is a little unconventional
//We have an external script module called gaugeMaker, which in turn will call the canvas-gauges library
//The gaugeMaker module will return a gauge object, which we can use to set the value of the gauge whenever the voltage changes

//The React version of canvas-gauges (react-canvas-gauges) is not compatible with the version of React we are using
//If it gets updated, we should switch to that as it has a built-in React component for the gauge, which is much more clean
var battGauge;

function Battery({voltage = 0}) {

    

    //useEffect is called after the component is rendered. This will set up the gauge object.
    //The gauge object will handle the drawing of the gauge. We are teling it where to draw the gauge and
    //setting some options on how it should look.
    useEffect(() => {
        battGauge = makeGauge('batt_gauge', 160, 0, 15, [0,3,6,9,12,15], 3, [
            {from:  0, to:  8, color: "#d60000"},
            {from:  8, to: 12, color: "#efdb00"},
            {from: 12, to: 15, color: "#41c603"}
        ], "white", "white", "#0085b2", 2, 32);

    }, []);

    //This useEffect is called whenever the voltage prop changes. We are telling the gauge object to update the value
    //of the gauge and then draw it.
    useEffect(() => {
        battGauge.value = voltage;
        battGauge.draw();
    }, [voltage])

    return (
        <div id="battery">
            <font style={{
                fontSize: "18pt",
                lineHeight: "12pt"
            }}>Battery</font>
            <canvas id="batt_gauge"></canvas>
        </div>
    );
}

export default Battery;