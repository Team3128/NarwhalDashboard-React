import React from 'react';
import './css/BasicLayoutStyles.css';

import './css/Backgrounds.css';

import logo from '../assets/logo.png';

//Import logo.png

function Header(props) {
    return (
        <div className="flexbox row navy" style={{ alignItems: "center", flexGrow: 0, padding: "10px", margin: "0px" }}>
            <div style={{ flex: "1 0 auto" }}>
                <a href="/"><img style={{ height: "60px" }} src={logo}/></a>
            </div>

            <div id="conn_button" className="button red" style={{ flex: "0 0 auto", borderRadius: "6px", padding: "10px", paddingLeft: "14px", paddingRight: "14px" }}>
                <font id="conn_button_text" style={{ fontSize: "20px", fontWeight: 700 }}>Disconnected</font>
            </div> 
        </div>
    );
}

export default Header;