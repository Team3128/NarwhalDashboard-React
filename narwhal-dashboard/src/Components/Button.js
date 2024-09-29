import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/Backgrounds.css';
import './css/BasicLayoutStyles.css';
import './css/AutoSelector.css';

function Button(props) {
  const [state, setState] = useState(false); // Button state

  useEffect(() => {
    if (props.socket != null) {
      props.socket.send("button:" + props.name + ":" + state);
    }
  }, [state]);

  return (
    <button
      onPointerDown={() => setState(true)}
      onPointerUp={() => setState(false)}
    >
      {props.display}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  socket: PropTypes.object,
};

export default Button;