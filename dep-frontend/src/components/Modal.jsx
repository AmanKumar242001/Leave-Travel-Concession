import { useState } from "react"
import "./Modal.css"

const Modal = ({children, ...props}) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible( visible => !visible)
  }
  return (
    <div>
    { props.title ? (<button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={toggleVisible}>{props.title} </button>): (
      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={toggleVisible}> View Application </button> )}

    { visible && (<>
      <div id='modaloverlay' onClick={toggleVisible}/>
      <div id='modalcontent'>
        <button class='dwnldpdf' style={{float: 'right'}} onClick={toggleVisible}> X </button>
        {children} 
      </div>
      </>
    )}
    </div>
  )
}

export default Modal
