import React, { useContext, useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import formatCreatedAtDate from '../utils/formatCreatedAtDate'
import { AiOutlineMore } from 'react-icons/ai'

const NoPfpVideoBox = ({ data }) => {
  const [showOptions,setShowOptions] = useState(false)
  const {setSelectedVideoId,user,notification} = useContext(AppContext)

  const deleteVideo = async(e)=> {
    e.preventDefault()
    try {
      let deleteVid = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/delete',{method:"DELETE",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({videoId:data._id})})
      let response = await deleteVid.json()
      if(deleteVid.ok){
        setShowOptions(false)
        notification("Video deleted successfully")
      }else{
        setShowOptions(false)
        notification("Video not found")}
    } catch (err) {}
  }


  return (
    <NavLink to={`/watch/${data._id}`} style={{textDecoration:"none"}} onClick={()=> setSelectedVideoId(data._id)}>
    <div className="VideoBox">
      <div className="thumbnail-img">
        <img src={data.thumbnail?.startsWith("https://res.cloudinary.com") ? `${data.thumbnail}` : `https://youtube-clone-rx4q.onrender.com/public/${data.thumbnail}`} alt="" />
      </div>
       <div className="video-information">
          <div className="text-information">
           {user._id === data.uploadedBy?._id ? 
            <AiOutlineMore className='more-video-options' onClick={(e) => { setShowOptions(!showOptions); e.preventDefault() }} /> : null}
            <div className={showOptions ? "more-options-here ss-s" : "more-options-here ss-h"}>
           <p onClick={deleteVideo}>Delete video</p> 
              </div>
            <p className='title'>{data.title}</p>
            <div className='info-mobile-view-yt'>
              <span className="channel-name">{data.uploadedBy.name} {data.uploadedBy.verified ? <MdVerified style={{ position: "relative", top: "1px", marginLeft: "5px" }} /> : null}</span>
              <span className='seprator-span' style={{ color: "#aaa", marginLeft: "5px", marginRight: "5px" }}>•</span>
              <div className="view-and-uploaded-at">
                <span className="views" style={{ marginRight: "5px" }}>{data.views} views</span>
                <span>•</span>
                <span className="uploaded-at" style={{ marginLeft: "5px" }}>{formatCreatedAtDate(data.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
    </NavLink>
  )
}

export default NoPfpVideoBox