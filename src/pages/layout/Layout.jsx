import React from 'react'
import { Outlet } from 'react-router-dom'
import Search from '../search/Search'
const Layout = () => {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default Layout