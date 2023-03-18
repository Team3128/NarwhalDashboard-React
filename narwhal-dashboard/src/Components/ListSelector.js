import React from 'react';
import './css/Backgrounds.css';

//import useRef and useEffect from react
import {useState} from 'react';

import './css/BasicLayoutStyles.css';
import './css/ListSelector.css';
import './css/Buttons.css';


/**
 * 
 * How To Use: 
 * Here are the props you can pass to this component:
 * itemType: The type of item that is being selected. This is used to display the title of the list selector.
 * imageSrc: The source of the image that will be displayed next to the list selector.
 * items: An array of items that will be displayed in the list selector.
 * onSelectItem: A function that will be called when an item is selected. The function will be passed the selected item.
 * 
 */

function ListSelector(props) {

    const [selectedItem, setSelectedItem] = useState(null);
    const [isMenuToggled, setIsMenuToggled] = useState(false);

    return (
        <div className="royal flexbox column list_sel_info">
        <div className="list_sel_box">
            <div className="list_sel_options">
            <p className="list_sel_title">Selected {props.itemType}:</p>
            <p className="list_sel_selected_item">
                {selectedItem ? selectedItem : "None"}
            </p>
            <div
                onClick={() => setIsMenuToggled(!isMenuToggled)}
                className="button sapphire list_sel_choose"
            >
                Choose
            </div>
            </div>
            <img className="list_sel_img" src={props.imageSrc} />
        </div>
        {/* Selection / Allows you to select the Auto-Program to load /*/}
        <div className="list_sel_full_list" style={{
            display: isMenuToggled ? "block" : "none"
        }}>
            <div
            id="auto_choice_none"
            onClick={() => {
                setSelectedItem(null);
                props.onSelectItem(null);
            }}
            className="button sapphire auto_choice_none"
            >
            None
            </div>

            {props.items.map((item, index) => {
            return (
                <div
                id={"auto_choice_"+index}
                key={index}
                onClick={() => {
                    setSelectedItem(item);
                    props.onSelectItem(item);
                }}
                className="button sapphire auto_choice_none"
                >
                {item}
                </div>
            );
            })}
        </div>
    </div>
    );
}

export default ListSelector;