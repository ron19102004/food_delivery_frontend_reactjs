import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthenticationLayout:React.FC = () => {
  return (
    <div><Outlet/></div>
  )
}

export default AuthenticationLayout