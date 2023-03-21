import React, {useEffect, useState} from 'react';
import './css/BasicLayoutStyles.css';

import './css/Backgrounds.css';

import logo from '../assets/logo.png';

//Import logo.png

const ConnectionStates = {
    DISCONNECTED: {
        "name": "Disconnected",
        "color": "red"
    },
    CONNECTING: {
        "name": "Connecting...",
        "color": "orange"
    },
    CONNECTED: {
        "name": "Connected",
        "color": "green"
    }
}

function Header(props) {

    const [connectionState, setConnectionState] = useState(ConnectionStates.DISCONNECTED);

    useEffect(() => {
        if(props.connectionStatus && connectionState === ConnectionStates.CONNECTING) {
            setConnectionState(ConnectionStates.CONNECTED);
        }

        if(!props.connectionStatus && connectionState === ConnectionStates.CONNECTED) {
            setConnectionState(ConnectionStates.DISCONNECTED);
        }
    }, [props.connectionStatus]);

    return (
        <div className="flexbox row navy" style={{ alignItems: "center", flexGrow: 0, padding: "10px", margin: "0px" }}>
            <div style={{ flex: "1 0 auto" }}>
                <a href="/"><img style={{ height: "60px" }} src={logo}/></a>
            </div>

            <div id="conn_button" className={`button ${connectionState.color}`} style={{ flex: "0 0 auto", borderRadius: "6px", padding: "10px", paddingLeft: "14px", paddingRight: "14px" }}
                onClick={() => {
                    if(connectionState === ConnectionStates.DISCONNECTED) {
                        props.connect();
                        setConnectionState(ConnectionStates.CONNECTING);
                    }
                    else if(connectionState === ConnectionStates.CONNECTED) {
                        props.disconnect();
                    }
                }}>
                <font id="conn_button_text" style={{ fontSize: "20px", fontWeight: 700 }}>{connectionState.name}</font>
            </div> 
        </div>
    );
}

export default Header;