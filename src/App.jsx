import React from 'react'
import Home from './pages/home/Home'
import Layout from './pages/layout/Layout'
import { RouterProvider } from 'react-router-dom'
import { myRoutes } from './router/routes'

const App = () => {
  return (
    <RouterProvider router={myRoutes}>
        <Layout/>
    </RouterProvider>
  )
}

export default App