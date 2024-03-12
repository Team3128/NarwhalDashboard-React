import React from 'react'
import './css/Status.css'
import Button from './Button'
import Status from './Status';

import {useEffect, useState} from 'react';

function StatusChecks(props) {
    return <>
        <div className = 'flexbox' style = {{alignItems: 'flex-start'}}>
                <div className='flexbox column status_Box' 
                    style={{
                        borderRadius: '15px',
                        padding: '5px',
                        marginRight: '15px',
                        width: '45%'
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
                <div className = 'flexbox column status_Box' style={{
                        width: '45%',
                        borderRadius: '15px',
                        padding: '5px',
                        display: 'flex',
                    }}>
                        <div className='flexbox row'>
                        <Status subsystem='Intake' connected={props.intake}></Status>
                        <Status subsystem='Shooter' connected={props.shooter}></Status>
                    </div>
                    <div className='flexbox row'>
                        <Status subsystem='Climber' connected={props.climber}></Status>
                        <Status subsystem="Amp Mech" connected={props.amp}></Status>
                    </div>
                    
                </div>
            </div>
    </>
}

export default StatusChecks;