import React from 'react'
import './css/Status.css'
import Button from './Button'
import Status from './Status';

import {useEffect, useState} from 'react';

function StatusChecks(props) {
    return <>
        <div className = 'flexbox row'>
                <div className='flexbox column' 
                    style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '5px',
                        width: '50%'
                    }}
                >
                    <div className='flexbox row'>
                        <Status subsystem='Module 0' connected= {props.mod0}/>
                        <Status subsystem='Module 1' connected={props.mod1}/>
                    </div>
                    <div className='flexbox row'>
                        <Status subsystem='Module 2' connected={props.mod2}/>
                        <Status subsystem='Module 3' connected={props.mod3}/>
                    </div>
                </div>
                <div style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '5px',
                        width: '25%'
                    }}>
                    <Status subsystem='Intake' connected={props.intake}></Status>
                    <Status subsystem='Shooter' connected={props.shooter}></Status>
                    <Status subsystem='Climber' connected={props.climber}></Status>
                </div>
            </div>
    </>
}

export default StatusChecks;