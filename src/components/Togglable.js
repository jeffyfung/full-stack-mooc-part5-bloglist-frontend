import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [defaultVisible, setdefaultVisible] = useState(true);

  const toggleVisibility = () => {
    setdefaultVisible(!defaultVisible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={{ display: defaultVisible ? "" : "none" }}>
        <button type="button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>

      <div style={{ display: !defaultVisible ? "" : "none" }}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
