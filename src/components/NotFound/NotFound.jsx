import React from 'react'
import './NotFound.module.css'
import notFoundPic from '../../assets/404.jpg'

export default function NotFound() {
  return (
    <div className='container mx-auto text-center'>
      <img src={notFoundPic} className='w-full' alt="" />
    </div>
  )
}
