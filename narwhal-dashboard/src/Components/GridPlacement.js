import React from 'react';
import './css/BasicLayoutStyles.css';

import './css/Backgrounds.css';

import './css/GridPlacement.css';

/**
 * 
 * This will create the scoring grid GUI
 * Other pieces of code can light up items on the grid by calling the lightItem() function on a ref of the Grid component.
 * 
 */

function GridPlacement({selectedNode = -1}) {

    return (
        <div className="flexbox grid_info">
            <div className="flexbox grid_flex top">
                <div className={`grid_item top cone${selectedNode === 0 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item top cube${selectedNode === 1 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item top cone${selectedNode === 2 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
            </div>
            <div className="flexbox grid_flex mid">
                <div className={`grid_item mid cone${selectedNode === 3 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item mid cube${selectedNode === 4 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
                <div className={`grid_item mid cone${selectedNode === 5 ? " grid_glow" : ""}`}>
                    <div className="shape" />
                </div>
            </div>
            <div className="flexbox grid_flex low">
                <div className={`grid_item unisex${selectedNode === 6 ? " grid_glow" : ""}`}>
                    <div className="tri" />
                    <div className="sq" />
                </div>
                <div className={`grid_item unisex${selectedNode === 7 ? " grid_glow" : ""}`}>
                    <div className="tri" />
                    <div className="sq" />
                </div>
                <div className={`grid_item unisex${selectedNode === 8 ? " grid_glow" : ""}`}>
                    <div className="tri" />
                    <div className="sq" />
                </div>
            </div>
        </div>
    );
}

export default GridPlacement;