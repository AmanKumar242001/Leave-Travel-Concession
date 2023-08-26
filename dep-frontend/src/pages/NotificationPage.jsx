import React, { useEffect, useState } from 'react'

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([])

  useEffect(()=>{
    fetch('/api/getNotifications', {
        method: "POST"
    }).then(res=>res.json()).then(setNotifications)
  }, [])
  return (
    <div className='z-[900] relative overflow-y-scroll overflow-x-hidden h-full bg-white divide-y divide-gray-100 rounded-lg shadow'>
      <div className='block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50'>
        Notifications
      </div>
      <div className='divide-y divide-gray-100'>
        <div className='absolute '>

        {notifications.map(item => ( <div className='shadow-md sm:rounded-lg w-full p-2.5 text-gray-800 font-medium my-4 bg-cyan-50'> {item.message} </div>))}
        </div>
      </div>
    </div>
  )
}
