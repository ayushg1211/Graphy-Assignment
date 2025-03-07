import React from 'react'
import { Outlet } from 'react-router-dom'
import Search from '../../components/Search'
const Layout = () => {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default Layout