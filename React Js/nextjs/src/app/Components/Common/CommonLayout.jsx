"use client";
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider } from 'react-redux'
import { store } from '@/app/ReduxToolkit/reduxToolkit'

export default function CommonLayout({children}) {
  return (
    <>
        <Provider store={ store }>
            <Header/>
                {children}
            <Footer/>
        </Provider>
    </>
  )
}
