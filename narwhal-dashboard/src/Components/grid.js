import React, { useImperativeHandle } from 'react';
import './css/BasicLayoutStyles.css';

import './css/Backgrounds.css';

import './css/grid.css';

import config from '../config.json';

//import useRef and useEffect from react
import {useRef, useEffect, useState, forwardRef} from 'react';

/**
 * 
 * This will create the scoring grid GUI
 * Other pieces of code can light up items on the grid by calling the lightItem() function on a ref of the Grid component.
 * 
 */

const Grid = forwardRef(function(props, ref) {

    const [litItem, setLitItem] = useState(-1);

    useImperativeHandle(ref, () => ({
        /**
         * @param {Array<number>} item Must be a two-element array of the form [row, column]. Rows and columns are 0-indexed from the top left of the 3x3 grid.
         */
        lightItem(item) {
            setLitItem(item[0]*3+item[1]);
        }
    }));

    useEffect(() => {

        if(litItem == -1) return;

        const timer = setTimeout(() => {
            setLitItem(-1);
        }, config["gridLightUpTime"]);

        return () => clearTimeout(timer);
    }, [litItem]);


    

    return (
        <div className="flexbox grid_info">
            <div className="flexbox grid_flex top">
                <div className={`grid_item top cone${litItem === 0 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item top cube${litItem === 1 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item top cone${litItem === 2 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
            </div>
            <div className="flexbox grid_flex mid">
                <div className={`grid_item mid cone${litItem === 3 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item mid cube${litItem === 4 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item mid cone${litItem === 5 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
            </div>
            <div className="flexbox grid_flex low">
                <div className={`grid_item unisex${litItem === 6 ? " grid_glow" : ""}`}>
                    <div className="tri" />
                    <div className="sq" />
                </div>
                <div className={`grid_item unisex${litItem === 7 ? " grid_glow" : ""}`}>
                    <div className="tri" />
                    <div className="sq" />
                </div>
                <div className={`grid_item unisex${litItem === 8 ? " grid_glow" : ""}`}>
                    <div className="tri" />
                    <div className="sq" />
                </div>
            </div>
        </div>
    );
});

export default Grid;