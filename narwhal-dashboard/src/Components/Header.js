import React, {useEffect, useState} from 'react';
import './css/BasicLayoutStyles.css';

import './css/Backgrounds.css';
import './css/Header.css';

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

    //This state stores whether Dark Mode is enabled
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = ()=>{
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        if(props.connectionStatus && connectionState === ConnectionStates.CONNECTING) {
            setConnectionState(ConnectionStates.CONNECTED);
        }

        if(!props.connectionStatus && connectionState === ConnectionStates.CONNECTED) {
            setConnectionState(ConnectionStates.DISCONNECTED);
        }
    }, [props.connectionStatus]);

    useEffect(()=>{
        const elems = document.body.getElementsByTagName("*");
        for (let i = 0; i < elems.length; i++) {
            if (darkMode) elems[i].classList.add('dark-mode');
            else elems[i].classList.remove('dark-mode');
        }

        if (darkMode) document.body.classList.add('dark-mode');
        else document.body.classList.remove('dark-mode');
    }, [darkMode, props.activeTab]);

    return (
        <div className="flexbox row navy" style={{ alignItems: "center", flexGrow: 0, padding: "5px", paddingLeft: "15px", paddingRight: "15px", margin: "0px" }}>
            <div style={{ flex: "1 0 auto" }}>
                <a href="/"><img style={{ height: "50px" }} src={logo}/></a>
            </div>

            <div id = "toggle">
                <input type="checkbox" id="darkmode-toggle" onChange={toggleDarkMode}/>
                <label for="darkmode-toggle">
                </label>
            </div>

            <div id="conn_button" className={`button ${connectionState.color}`} style={{ flex: "0 0 auto", borderRadius: "6px", padding: "10px", paddingLeft: "17px", paddingRight: "17px" }}
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