import React from 'react'
import './ProtectedAuth.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuth(props) {
  if (localStorage.getItem('userToken')) {
    return <Navigate to = '/'/>
  }
  else{
    return props.children
  }

}
