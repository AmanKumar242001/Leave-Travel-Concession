import React from 'react'
import { Link } from "react-router-dom";
import ProfileImage from '../../public/user.png'

export default function ProfileAvatar() {
  return (
    <>
      <Link to={"/avatar"} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
        {/* <img className='w-8 h-8 rounded-full' src={ProfileImage} alt="Avatar" />  */}
        User profile
      </Link>
    </>
  )
}
