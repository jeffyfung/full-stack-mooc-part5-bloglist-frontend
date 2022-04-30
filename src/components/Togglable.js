import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [defaultVisible, setdefaultVisible] = useState(true);

  const toggleVisibility = () => { setdefaultVisible(!defaultVisible) };

  useImperativeHandle(ref, () => {
    return {toggleVisibility}
  });

  return (
    <div>
      <div style={ {display: defaultVisible ? '' : 'none'} }>
        <button type="button" onClick={toggleVisibility}>{props.buttonLabel1}</button>
      </div> 
    
      <div style={ {display: !defaultVisible ? '' : 'none'}}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>cancel</button>
      </div>
      
    </div>
  )
});

export default Togglable