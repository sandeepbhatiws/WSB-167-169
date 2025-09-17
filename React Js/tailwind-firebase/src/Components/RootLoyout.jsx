import React from 'react'
import Header from './Common/Header'
import Footer from './Common/Footer'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

export default function RootLoyout() {
  return (
    <>
        <ToastContainer/>
      <Header/>

        <Outlet/>

      <Footer/>
    </>
  )
}
