import React from 'react'
import { useContext } from 'react'
import { useState, useEffect, useRef } from 'react'
import { LoginContext } from '../LoginContext'
import { stringify } from 'postcss'
import Form from '../components/Form'
import Input from '../components/Input'

function formatDate(date) {
  return new Date(date).toISOString().substring(0, 10)
}

export default function UserProfile() {

  const [user, setUser] = useContext(LoginContext)
  const imgRef = useRef(null)
  useEffect(() => {
    fetch('/api/getSignImage', { method: "POST" }).then(res => res.blob()).then(blob => {
      const url = URL.createObjectURL(blob);
      imgRef.current.src = url
    })
  }, [])

  return (
    // <div>{JSON.stringify(user)}</div>
    <div className='max-w-screen-xl mx-auto'>
      <Form>
        <div className="m-4 grid gap-6 mb-1 md:grid-cols-2 xl:grid-cols-4">
          <Input label={"First Name"} name="First Name" type="text" value={user.firstName} readOnly />
          <Input label={"Last Name"} name="Last Name" type="text" value={user.lastName} readOnly />
          <Input label={"Designation"} name="Designation" type="text" value={user.designation} readOnly />
          <Input label={"Pay Level"} name="Pay Level" type="int" value={user.payLevel} readOnly />
          <Input label={"Date Of Joining"} name="Date of Joining" type="date" value={formatDate(user.dateOfJoining)} readOnly />
        </div>
        <div className='flex items-center mt-4'>
          <span className='font-medium mx-4'>Signature</span>
          <img  ref={imgRef} placeholder='signature.jpg' className='w-[300px] h-[100px]'/>
        </div>
      </Form>
    </div>
  )
}
