import React, { FC } from 'react'
import { Header } from '../header'
import { Footer } from '../footer';

interface LayoutProps{
    children: any;
}

const Layout:FC<LayoutProps> = ({ children}) => {

  return (
    <>
        <Header/>
        {children}
        <Footer/>
    </>
  )
}

export default Layout