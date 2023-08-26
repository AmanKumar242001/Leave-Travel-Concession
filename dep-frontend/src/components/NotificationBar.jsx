import React, { useRef } from 'react'
import { Link } from "react-router-dom";
import NotificationIcon from '../../public/notification-icon.png'
import NotificationPage from '../pages/NotificationPage';
export default function NotificationBar({open, setOpen}) {

  // return (
  //   <>
  //     <Link to={"/notification"} className='flex mr-3 text-sm  rounded-full md:mr-8 focus:ring-4 focus:ring-gray-300'
  //     ><img className='w-8 h-8 rounded-full'  alt="Notifications" src={NotificationIcon}/> </Link>
  //   </>
  // )\\\\
  const ref = useRef(null);

  var visnotif = false
  if(open) ref.current && ref.current.show()
  else ref.current && ref.current.close()

  const clickHandler = (e) => {
    setOpen(open => !open)
  }
  return (
    <>
    <div onMouseDown={e => e.stopPropagation()}>
    <button onMouseDown={clickHandler}>
    <img className='w-8 h-8 rounded-full'  alt="Notifications" src={NotificationIcon} />
    </button>
    <dialog ref={ref} className='h-96 absolute left-auto p-0 w-96 rounded-lg'>
      <NotificationPage />
    </dialog>
    </div>
    </>
 )
}
