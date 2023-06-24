import React, { useState, useContext, useEffect } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { MdOutlineShare } from 'react-icons/md'
import { HiOutlineSaveAs, HiSaveAs } from 'react-icons/hi'
import formatCreatedAtDate from '../utils/formatCreatedAtDate'
import { AppContext } from '../context/AppContext'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { AiOutlineComment } from 'react-icons/ai'

const VideoInformation = ({ videoData, c }) => {
  const params = useParams()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [toggle, setToggle] = useState(0)
  const { setCreatorSubscribers, creatorSubscribers, handleUserLike, setHandleUserLike, handleUserDislike, setHandleUserDislike, handleWatchlist, setHandleWatchList, user, setOpenComments, openDiscripton, setOpenDiscription, notification, openComments, setShare, setSubscribedTo, subscribedTo, subscribedCreatorList, setSubscribedCreatorList } = useContext(AppContext)
  document.title = `${videoData.title === undefined ? 'Loading...' : videoData.title}`

  useEffect(() => {
    checkCurrentLikeStatus()
  }, [])

  const checkCurrentLikeStatus = () => {
    if (handleUserLike.map((likedUsers) => likedUsers).includes(user._id)) {
      setToggle(1)
    } else if (handleUserDislike?.map((dislikeUsers) => dislikeUsers).includes(user._id)) {
      setToggle(2)
    } else {
      setToggle(0)
    }
  }


  const likeVideo = async () => {
    try {
      if (!user._id) navigate('/login')
      setToggle(1)
      setHandleUserLike([...handleUserLike, user._id])
      setHandleUserDislike(handleUserDislike.filter((userId) => userId !== user._id))
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/like', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: params.id })
      })
      let response = await like.json()
      if (like.ok) {
        await removeDislike()
      }
    } catch (err) {}
  }

  const removelike = async () => {
    try {
      setToggle(0)
      setHandleUserLike(handleUserLike.filter((users) => users !== user._id))
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/remove-like', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: params.id })
      })
      let response = await like.json()
    } catch (err) { }
  }

  const dislikeVideo = async () => {
    try {
      if (!user._id) navigate('/login')
      setToggle(2)
      setHandleUserDislike([...handleUserDislike, user._id])
      setHandleUserLike(handleUserLike.filter((userId) => userId !== user._id))
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/dislike', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: params.id })
      })
      let response = await like.json()
      if (like.status === 200) {
        await removelike()
        notification("Feedback shared with the creator")
      }
    } catch (err) { }
  }

  const removeDislike = async () => {
    try {
      setToggle(0)
      setHandleUserDislike(handleUserDislike.map((users) => users !== user._id))
      let like = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/remove-dislike', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: params.id })
      })
      let response = await like.json()
    } catch (err) {}
  }

  const addSubscription = async () => {
    try {
      if (!user._id) navigate('/login')
      setCreatorSubscribers([...creatorSubscribers, user._id])
      setSubscribedCreatorList([...subscribedCreatorList, videoData.uploadedBy])
      let subscribe = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/subscribe', {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creatorId: videoData.uploadedBy?._id })
      })
      let response = await subscribe.json()
      setSubscribedTo([...subscribedTo, response.map((videos)=> videos)])
      if (subscribe.ok) {
        notification("Subscription added")
      }
    } catch (err) {}
  }

  const unSubscribe = async () => {
    try {
      setCreatorSubscribers(creatorSubscribers.filter((userId) => userId !== user._id))
      setSubscribedCreatorList(subscribedCreatorList.filter((creator) => creator._id !== videoData.uploadedBy?._id))
      setSubscribedTo(subscribedTo.filter((video) => video.uploadedBy?._id !== videoData.uploadedBy?._id))
      let unSub = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/unsubscribe', {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ creatorId: videoData.uploadedBy?._id }),
        headers: { "Content-Type": "application/json" }
      })
      let response = await unSub.json()
      if (unSub.status === 200) {
        notification(`Unsubscribed from ${videoData.uploadedBy?.name}`)
      }
    } catch (err) { }
  }

  const saveToWatchLater = async () => {
    try {
      if (!user._id) navigate('/login')
      setHandleWatchList([...handleWatchlist, videoData])
      let addVid = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/save/video', {
        method: "PUT",
        body: JSON.stringify({ videoId: params.id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
      let response = await addVid.json()
      if (addVid.ok) {
        notification("Saved to watchlist")
      }
    } catch (err) {}
  }

  const removeFromWatchLater = async () => {
    try {
      setHandleWatchList([handleWatchlist.filter((id) => id !== params.id)])
      let addVid = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/remove/video', {
        method: "PUT",
        body: JSON.stringify({ videoId: params.id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
      let response = await addVid.json()
      if (addVid.ok) {
        notification("Removed from watchlist")
      }
    } catch (err) { res.status(500).send(err.message) }
  }


  useEffect(() => {
    if (openDiscripton) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "scroll"
    }
  }, [openDiscripton])

  return (
    <div className={`VideoInformation ${c}`}>
      <p className="title pc-big pc">{videoData.title}</p>
      <p className="title pc-big mob" onClick={() => { setOpenDiscription(true); setShow(true) }}>{videoData.title}</p>
      <div className="video-options">
        <div className="channel-name-and-subscribe-yt-container">
          <div className="yt-center-flex">
            <NavLink to={`/profile/${videoData.uploadedBy?._id}`} style={{ textDecoration: "none", display: "flex" }}>
              <img src={videoData.uploadedBy?.picture?.startsWith('https://') ?  videoData.uploadedBy?.picture : `https://youtube-clone-rx4q.onrender.com/public/${videoData.uploadedBy?.picture}`} alt="" />
              <div className='creator-yt-info'>
                <p>{videoData.uploadedBy?.name}</p>
                <span>{creatorSubscribers?.length} subscribers</span>
              </div>
            </NavLink>
            {
              videoData.uploadedBy?._id === user._id ? null : creatorSubscribers?.map((subsID) => subsID).includes(user._id) ?
                <button className='subscribed' onClick={unSubscribe}>Subscribed</button> : <button className='subscribe' onClick={addSubscription}>Subscribe</button>
            }
          </div>
          <div className="more-options-by-yt">
            <div className="like-and-dislike">

              {
                toggle === 2 ? <button className="like" onClick={likeVideo}>
                  <AiOutlineLike style={{ color: "#f1f1f1", fontSize: "23px", marginRight: "10px" }} />
                  <span style={{ fontSize: "1rem", position: "relative", top: "1px" }}>{handleUserLike?.length}</span></button> :
                  handleUserLike.map((likedUsers) => likedUsers).includes(user._id) ?
                    <button className="like" onClick={removelike}>
                      <AiFillLike style={{ color: "#f1f1f1", fontSize: "23px", marginRight: "10px" }} />
                      <span style={{ fontSize: "1rem", position: "relative", top: "1px" }}>{handleUserLike?.length}</span></button>
                    : <button className="like" onClick={likeVideo}>
                      <AiOutlineLike style={{ color: "#f1f1f1", fontSize: "23px", marginRight: "10px" }} />
                      <span style={{ fontSize: "1rem", position: "relative", top: "1px" }}>{handleUserLike?.length}</span></button>
              }



              <span className='line'></span>

              {
                toggle === 1 ? <button className="dislike" onClick={dislikeVideo}><AiOutlineDislike style={{ color: "#f1f1f1", fontSize: "23px" }} /></button> :
                  handleUserDislike?.map((dislikeUsers) => dislikeUsers).includes(user._id) ?
                    <button className="dislike" onClick={removeDislike}><AiFillDislike style={{ color: "#f1f1f1", fontSize: "23px" }} /></button> :
                    <button className="dislike" onClick={dislikeVideo}><AiOutlineDislike style={{ color: "#f1f1f1", fontSize: "23px" }} /></button>
              }

            </div>

            <button className='comment' onClick={() => setOpenComments(true)}><AiOutlineComment style={{ fontSize: "23px", marginRight: "3px" }} /> <span >Comments</span></button>

            <button className='share' onClick={() => setShare(true)}><MdOutlineShare style={{ fontSize: "23px", marginRight: "3px" }} /> <span>Share</span></button>

            {
              !user ? <NavLink to={'/login'} style={{ textDecoration: "none" }}><button className='share'><HiOutlineSaveAs style={{ fontSize: "23px", marginRight: "3px" }} /> <span>Save</span></button></NavLink> :
                handleWatchlist?.map((video) => video._id).includes(params.id) ?
                  <button className='save' onClick={removeFromWatchLater}><HiSaveAs style={{ fontSize: "23px", marginRight: "3px" }} /> <span >Saved</span></button> :
                  <button className='save' onClick={saveToWatchLater}><HiOutlineSaveAs style={{ fontSize: "23px", marginRight: "3px" }} /> <span>Save</span></button>
            }
            {/* HiSaveAs */}


          </div>
        </div>

        <div className={openDiscripton ? "rgba-container show-container index-high" : "rgba-container hide-container"} onClick={() => { setOpenDiscription(false); setShow(false) }}></div>
        <div className={openDiscripton ? "Discription open-discription" : "Discription hide-discription"}>
          <div className="view-and-uploaded-at">
            <span className="views" style={{ marginRight: "5px", color: "#f1f1f1" }}>{videoData.views} views</span>
            <span>•</span>
            <span className="uploaded-at" style={{ marginLeft: "5px", color: "#f1f1f1" }}>{formatCreatedAtDate(videoData.createdAt)}</span>
          </div>


          <div className="discription-txt">
            {<pre className='pre'>{!openComments && show ? <>{videoData.discription}
              <p onClick={() => { setShow(false); scrollTo(0, 0) }} className="handle-show">show less</p> </>
              : <>{videoData.discription?.length > 80 ? videoData.discription?.slice(0, 80) + "..." : videoData.discription}  
              { videoData.discription?.length > 80 ?  <p onClick={() => setShow(true)} className="handle-show">show more</p> : null} </>}
            </pre>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoInformation