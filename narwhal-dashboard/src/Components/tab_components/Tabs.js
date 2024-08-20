import React, {useEffect, useState} from 'react';
import '../css/BasicLayoutStyles.css';

import '../css/Backgrounds.css';

import '../css/Tabs.css';


const Tabs = (props) => {
    const [activeTab, setActiveTab] = useState("driverView");

    const handleTabDriverView = () => {
        setActiveTab("driverView")
        props.driverView();
    };
    const handleTabAuto = () => {
        setActiveTab("auto")
        props.auto();
    };
    const handleTabVision = () => {
        setActiveTab("vision")
        props.vision();
    };
    const handleTabDebug = () => {
        setActiveTab("debug")
        props.debug();
    }
    const handleModuleThrottling = () => {
        setActiveTab("module")
        props.module();
    }

    return (
        <>
        <div className="flexRowTabs">
            <div onClick={handleTabDriverView} className = {"button sapphire " + (activeTab === "driverView" ? "active" : "")}>Driver's View</div>
            <div onClick={handleTabAuto} className = {"button sapphire " + (activeTab === "auto" ? "active" : "")}>Auto</div>
            <div onClick={handleTabVision} className = {"button sapphire " + (activeTab === "vision" ? "active" : "")}>Vision</div>
            <div onClick={handleTabDebug} className = {"button sapphire " + (activeTab === "debug" ? "active" : "")}>Debug</div>
            <div onClick={handleModuleThrottling} className = {"button sapphire " + (activeTab === "module" ? "active" : "")}>Module Throttling</div>

        </div>
        </>
        
    );
};

export default Tabs;