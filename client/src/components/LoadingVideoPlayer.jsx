import React from 'react'

const LoadingVideoPlayer = () => {
  return (
    <div className="loading-container-videoplayer">
        <div className="video-loading loading-box"></div>
        <div className="loading-video-information">
        <div className="loading-img"></div>
        <div className="loading-title">
        <p className='loading-box' style={{height:"18px"}}></p>
         <p className='loading-box' style={{height:"18px",width:"70%",marginTop:"10px"}}></p>
        </div>
        </div>
    </div>
  )
}

export default LoadingVideoPlayer