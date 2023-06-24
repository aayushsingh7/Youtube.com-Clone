import React from 'react'
import CategoryNavbar from '../components/CategoryNavbar'
import NoPfpVideoBox from '../components/NoPfpVideoBox'
import VideoBox from '../components/VideoBox'

const VideosContainer = ({ required , txt , pfp ,seemore }) => {
  return (
    <div className='VideoContainer'>
   {required ? <CategoryNavbar/> : null}
   <div className="Videos-Handler-Container-yt" style={{height:"calc(100vh - 70px)"}}>
   <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
    {
      !txt ? null  :<div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",width:"90%"}}><p style={{color:"#f1f1f1",fontSize:"1.6rem",marginBottom:"20px"}}>{txt}</p> {!seemore ? null :  <button className='see-more'>See more</button>}</div>
    }
   <div className="grid-video-container four-column">
       <NoPfpVideoBox/>
       <NoPfpVideoBox/>
       <NoPfpVideoBox/>
       <NoPfpVideoBox/>
       <NoPfpVideoBox/>
       <NoPfpVideoBox/>
       <NoPfpVideoBox/>
       <NoPfpVideoBox/>
    </div>
   </div>
   </div>
    </div>
  )
}

export default VideosContainer