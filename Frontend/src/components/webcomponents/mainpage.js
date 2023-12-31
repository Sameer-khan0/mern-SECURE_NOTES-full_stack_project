import React from 'react'
import Navbar from './navbar'
import Mainview from './mainview'
import '../maincss/mainpage.css'

export default function Mainpage() {
  return (
    <>
    <div className='mainwebpages'>
    <div className='navview'>
    <Navbar />
    </div>
    <div className='centerview'>
    <Mainview />
    </div>
    </div>

  </>
  )
}
