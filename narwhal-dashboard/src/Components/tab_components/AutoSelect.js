import React from 'react';

import DashboardBase from '../../DashboardBase';
import AutoSelector from '../AutoSelector';


const DriverView = (props) => {
    return <DashboardBase leftWidth = {100} middleWidth = {0} rightWidth = {0}
        left = {
            <AutoSelector socket={props.socket} autoPrograms={props.dataMap.get('auto')}/>
        }       
        />
};

export default DriverView;