import React from 'react'
import CategoryNavbar from '../components/CategoryNavbar'
import NoPfpVideoBox from '../components/NoPfpVideoBox'

const CreatorProfileVideosContainer = ({required, data }) => {
  return (
    <div className='VideoContainer' style={{marginTop:"20px"}}>
   {required ? <CategoryNavbar/> : null}
   <div className="Videos-Handler-Container-yt" style={{overflow:"visible"}}>
   <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%"}}>
   <div className="grid-video-container" style={{width:"100%"}}>
     {
      data?.map((response)=> {
        return   <NoPfpVideoBox data={response} key={response._id} />
      })
     }
    </div>
   </div>
   </div>
    </div>
  )
}

export default CreatorProfileVideosContainer