import React, { useEffect, useState } from 'react';
import { DROPDOWN_CONTENT, SUPPORTED_LANGAUGES } from '../constant/languages';

function Lang({changeLanguage,lang}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(()=>{
    console.log(lang);
  },[])

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  function handleLanguageSelect(language) {
    changeLanguage(language);
    setDropdownOpen(false);
  };


  return (
    <div className="relative">
      <div
        tabIndex="0"
        role="button"
        className="btn m-1"
        onClick={toggleDropdown}
      >
        {lang}
      </div>
      {
        isDropdownOpen && <ul className="absolute top-1 right-0 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {
          SUPPORTED_LANGAUGES.map((language,i)=>{
            return (<li onClick={()=>{
              handleLanguageSelect(language);
            }
            }>
              <span>{DROPDOWN_CONTENT[i]}</span>
            </li>
            )
          })
          }
        </ul>
      }
    </div>
  );
}

export default Lang;
