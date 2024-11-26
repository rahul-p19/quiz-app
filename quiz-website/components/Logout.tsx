'use client';
import { signOut } from '@/auth'
import React from 'react'

function Logout() {
  return (
    <button className='text-red-500 fixed top-6 right-6' onClick={()=>signOut({redirect:true, redirectTo: "/"})}>Logout</button>
  )
}

export default Logout