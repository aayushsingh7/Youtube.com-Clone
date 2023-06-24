import React, { useContext, useState } from 'react'
import { MdMore, MdVerified } from 'react-icons/md'
import formatCreatedAtDate from '../utils/formatCreatedAtDate'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { AiOutlineMore } from 'react-icons/ai'

const VideoBox = ({ data }) => {
  const navigate = useNavigate()
  const { setSelectedVideoId, setHistory, history ,notification,setHandleWatchList,handleWatchlist} = useContext(AppContext)
  const [showOptions, setShowOptions] = useState(false)

  const viewProfile = (e)=> {
    e.preventDefault()
    navigate(`/profile/${data.uploadedBy?._id}`)
  }

  const removeFromHistory = async (e) => {
    e.preventDefault()
    try {
      let removeVid = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/remove-from-history`, {
        method: "PUT", 
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: data._id })
      })
      let response = await removeVid.json()
      if (removeVid.ok) {
        setHistory(history.filter((video) => video._id !== data._id))
        notification("All views of this video removed from history")
        setShowOptions(false)
    }
    } catch (err) {}
  }

  const removeFromSaved = async(e)=> {
    e.preventDefault()
    try {
      let removeVid = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/remove/video',{
        method:"PUT",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({videoId:data._id})
      })
      let response = await removeVid.json()
      if(removeVid.ok){
       setHandleWatchList(handleWatchlist.filter((video)=> video._id !== data._id))
       notification("Removed from watch later")
       setShowOptions(false)
      }
    } catch (err) {console.log(err)}
  }

  // const removeFromHistoryAfterClicked = async () => {
  //   try {
  //     let removeVid = await fetch(`https://youtube-clone-rx4q.onrender.com/api/v1/remove-from-history`, {
  //       method: "PUT",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ videoId: data._id })
  //     })
  //     let response = await removeVid.json()
  //     if (removeVid.ok) {
  //       setHistory(history.filter((video) => video._id !== data._id))
  //       notification("All views of this video removed from history")
  //       setShowOptions(false)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <NavLink to={`/watch/${data._id}`} style={{ textDecoration: "none" }} 
    onClick={() => { setSelectedVideoId(data._id); scrollTo(0, 0); }}>
      <div className="VideoBox">
        <div className="thumbnail-img">
          <img src={!data.thumbnail ? "https://www.cyberlink.com/prog/learning-center/html/4090/PDR19-YouTube-21_How_to_Name_Your_YouTube_Videos/img/No-Thumbnail.png" :
           data.thumbnail.startsWith("https://res.cloudinary.com") ? data.thumbnail :
           `https://youtube-clone-rx4q.onrender.com/public/${data.thumbnail}`} alt="" />
        </div>
        <div className="video-information">
            <img src={data.uploadedBy?.picture?.startsWith('https://') ?  data.uploadedBy?.picture : data.uploadedBy?.picture?.startsWith("https://res.cloudinary.com") ? data.uploadedBy?.picture :  `https://youtube-clone-rx4q.onrender.com/public/${data.uploadedBy?.picture}`} alt="" onClick={viewProfile} />
          <div className="text-information">
           {location.pathname.startsWith('/history') || location.pathname.startsWith('/watchlater') ?  <AiOutlineMore className='more-video-options' onClick={(e) => { setShowOptions(!showOptions); e.preventDefault() }} /> : null}
            <div className={showOptions ? "more-options-here ss-s" : "more-options-here ss-h"}>
            {location.pathname.startsWith('/history') ?   
            <p onClick={removeFromHistory}>Remove from history</p> : location.pathname.startsWith('/watchlater') ? 
            <p onClick={removeFromSaved}>Remove from watchlater</p> : null}
              </div>
            <p className='title'>{data.title}</p>
            <div className='info-mobile-view-yt'>
              <span className="channel-name">{data.uploadedBy?.name} {data.uploadedBy?.verified ? <MdVerified style={{ position: "relative", top: "1px", marginLeft: "5px" }} /> : null}</span>
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

export default VideoBox