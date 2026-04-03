import React from 'react'
import "./AppDownload.css"
import google from '/public/assets/AppDownload/google-paly.png'
import appstore from '/public/assets/AppDownload/app store.png'
function AppDownload() {
  return (
    <div className='app-download' id="app-download">
      <p>For Better experience Download  <br/>Food App</p>
      <div className="app-downloads-platforms">
      <img src={google} alt="app store"/>
      <img src={appstore} alt="app store"/>

      </div>
    </div>
  )
}

export default AppDownload;
