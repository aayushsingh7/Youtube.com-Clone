import React from 'react'

const LoadingBox = () => {
  return (
   <div className="VideoBox">
     <div className="thumbnail-img loading-box">
    </div>

    <div className="video-information">
       <div className='loading-img'></div>
        <div className="text-information" style={{width:"100%"}}>
          <p className='loading-box' style={{height:"18px"}}></p>
         <p className='loading-box' style={{height:"18px",width:"70%",marginTop:"10px"}}></p>
        </div>
      </div>

   </div>
  )
}

export default LoadingBox