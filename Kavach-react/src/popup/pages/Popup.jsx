import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Header from '../components/Header'
import Home from './Home'
import Analysis from './Analysis'
import Customize from './Customize'
import Footer from '../components/Footer'


function Popup() {
    const [tab,setTab] = useState("HOME")
    const tabSetter = (curTab)=>{
        setTab(curTab)

    }
  return (
    <div className='Popup-Container'>
        <Header />
        <Navbar current={tab} tabSetter={tabSetter}/>
        <div>
            {tab==="HOME"?<Home />:tab==="ANALYSIS"?<Analysis />:<Customize />}
        </div>
        <Footer />
    </div>
  )
}

export default Popup