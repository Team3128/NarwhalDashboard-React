import React from 'react';
import './css/Backgrounds.css';

//import useRef and useEffect from react
import {useState} from 'react';

import './css/BasicLayoutStyles.css';
import ListSelector from './ListSelector';
import './css/AutoSelector.css';

function AutoSelector(props) {
    const [selectedAuto, selectAuto] = useState(props.selectedAuto);

    return (
            <ListSelector
                defaultSelected={selectedAuto}
                itemType="Auto"
                items={props.autoPrograms}
                onSelectItem={(item) => {
                    props.socket.send("selectAuto:" + item);
                    selectAuto(item);
                }}
                //Image must be in the public folder to change on runtime
                imageSrc = {selectedAuto != null ? process.env.PUBLIC_URL + "/auto_imgs/" + selectedAuto + '.gif' : ""}
            />
    );
}

export default AutoSelector;