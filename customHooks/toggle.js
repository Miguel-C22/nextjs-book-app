import React from "react";

//*********just a custom hook that switches to truth and false. No need for it but made it just incase*************

function useToggle(){
    const [toggle, setToggle] = React.useState(false)
    
    function toggleOnOff(){
        setToggle(toggle => !toggle)
        
    }
    return { toggle, toggleOnOff }
}
export default useToggle