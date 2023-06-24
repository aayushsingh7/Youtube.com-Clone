
import React from 'react'
import LoadingBox from './LoadingBox'

const LoadingProfilePage = () => {
  return (

        <div className="Profile">
          <div className="Contents" style={{ width: "100%" }}>
            <div className="Creator-profile-info-yt" style={{overflow:"hidden"}}>
              <div style={{ width: "100%",minHeight:"220px" }} className="loading-box banner-container"></div>
              <div className="User-info-yt-with-creator-info">
                <div className="profile-page-header">
                  <div className="creator-info-logo-name" style={{width:"100%",marginBottom:"20px"}}>
                    <div className='loading-img' style={{ height: "70px", width: "75px", borderRadius: "50%" }} ></div>
                     <div className="text-information" style={{width:"100%"}}>
               <p className='loading-box' style={{height:"18px"}}></p>
              <p className='loading-box' style={{height:"18px",width:"70%",marginTop:"10px"}}></p>
                </div>
                  </div>
                </div>
                <div className="grid-video-container" style={{width:"100%"}}>
                            <LoadingBox />
                            <LoadingBox />
                            <LoadingBox />
                            <LoadingBox />
                            <LoadingBox />
                            <LoadingBox />
                        </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default LoadingProfilePage