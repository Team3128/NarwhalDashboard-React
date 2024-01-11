import React from 'react';
import './css/Backgrounds.css';

//import useRef and useEffect from react
import {useState} from 'react';

import './css/CameraView.css';
import './css/BasicLayoutStyles.css';
import './css/Buttons.css';
import './css/Backgrounds.css';

//Camera Address from Jekyll Guggal: http://10.31.28.26:5800

function CameraView({cameraURL = "", cameraName = "Camera"}) {

    const [camConnected, setCamConnected] = useState(false);

    return (
        <div className="flexbox column squash limelight_info">    
            <div className="container limelight_container navy">
                <div id="limelight_conn_button" onClick={() => setCamConnected(!camConnected)} className={`button conn_button ${camConnected ? "green" : "red"}`}>
                    <p className="conn_button_text" id="limelight_conn_button_text">
                        {camConnected ? `Hide ${cameraName} Stream` : `Show ${cameraName} Stream`}
                    </p>
                </div>
                <div id="cameras" style={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <div className="table_row" style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", height: "100%"}}>
                        <img id="limelight_stream_0" className="stream" src={camConnected ? cameraURL : ""} style={{
                            display: camConnected ? "inline_block" : "none",
                        }}/>
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default CameraView;