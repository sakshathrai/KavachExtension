import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Header from '../components/Header'
import Home from './Home'
import Analysis from './Analysis'
import Customize from './Customize'
import Footer from '../components/Footer'
import { getChosenLanguage, setChosenLanguage } from '../../helper/storage'
import { LANGUAGES } from '../constant/languages'


function Popup() {
    const [tab,setTab] = useState("HOME")
    const [lang,setLang] = useState("ENGLISH");
    const tabSetter = (curTab)=>{
        setTab(curTab)
    }

    const changeLanguage = async (l)=>{
      console.log(l);
      await setChosenLanguage(l);
      setLang(l);
    }

    useEffect(()=>{
      console.log(lang);
    },[lang])

    useEffect(()=>{
      getChosenLanguage().then((l)=>{
        setLang(l)
      })
    },[])
  return (
    <div className='Popup-Container'>
        <Header changeLanguage={changeLanguage} lang={lang} PLACEHOLDER={LANGUAGES[lang]}/>
        <Navbar current={tab} tabSetter={tabSetter} PLACEHOLDER={LANGUAGES[lang]}/>
        <div>
            {tab==="HOME"?<Home PLACEHOLDER={LANGUAGES[lang]}/>:tab==="ANALYSIS"?<Analysis PLACEHOLDER={LANGUAGES[lang]}/>:<Customize PLACEHOLDER={LANGUAGES[lang]}/>}
        </div>
        <Footer PLACEHOLDER={LANGUAGES[lang]}/>
    </div>
  )
}

export default Popup