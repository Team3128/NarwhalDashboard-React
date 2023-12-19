import React from 'react';
import {useState, useRef, useEffect} from "react";
import io, { connect } from 'socket.io-client';

//import var field from the field png
import field from '../assets/field.png';

const Field = () => {
    return(
        <>
            <img id = "field" src = {field}>

            </img>
        </>
    );
}

export default Field;