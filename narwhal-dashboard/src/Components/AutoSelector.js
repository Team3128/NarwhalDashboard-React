import React from 'react';
import './css/Backgrounds.css';

//import useRef and useEffect from react
import {useState} from 'react';

import './css/BasicLayoutStyles.css';
import ListSelector from './ListSelector';
import {send} from '../RobotConnection/SocketManager';
import './css/AutoSelector.css';

function AutoSelector(props) {

    return (
            <ListSelector
                itemType="Auto"
                items={props.autoPrograms}
                onSelectItem={(item) => {
                    props.socket.send("selectauto:" + item);
                    //TODO: Update the auto image
                }}
            />
    );
}

export default AutoSelector;